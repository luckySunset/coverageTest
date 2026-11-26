const fs = require('fs')
const { createCoverageMap } = require('istanbul-lib-coverage')
const { createContext } = require('istanbul-lib-report')
const { createSourceMapStore } = require('istanbul-lib-source-maps')
const reports = require('istanbul-reports')

function validateVueSourceMaps(coverage) {
  const invalidFiles = []

  for (const [filename, fileCoverage] of Object.entries(coverage)) {
    if (!filename.endsWith('.vue')) continue

    const sourceMap = fileCoverage.inputSourceMap
    const hasSources = Array.isArray(sourceMap?.sources) && sourceMap.sources.length > 0
    const hasMappings = typeof sourceMap?.mappings === 'string' && sourceMap.mappings.length > 0
    if (!hasSources || !hasMappings) {
      invalidFiles.push(filename)
    }
  }

  if (invalidFiles.length > 0) {
    throw new Error(
      `Vue source map 无效，请重新构建并采集覆盖率数据：\n${invalidFiles.join('\n')}`
    )
  }
}

async function main(){
  const raw = JSON.parse(fs.readFileSync('./.nyc_output/out.json','utf-8'))
  validateVueSourceMaps(raw)
  const coverageMap = createCoverageMap(raw)
  const sourceMapStore = createSourceMapStore()

  console.log('remap前:',coverageMap.files())
  const remappedCoverageMap = await sourceMapStore.transformCoverage(coverageMap)
  console.log('remap后:',remappedCoverageMap.files())
  const context = createContext({
    dir: './coverage',
    coverageMap: remappedCoverageMap,
    sourceFinder: sourceMapStore.sourceFinder
  })

  reports.create('html').execute(context)
  reports.create('text-summary').execute(context)
  console.log('报告生成完成')
}

main().catch(error =>{
  console.log('报告生成失败: ',error)
  process.exitCode=1
})
