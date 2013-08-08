package d3demo

import grails.converters.JSON

class ModuleController {

    def moduleService

    def randomize() {
        moduleService.randomize()
        redirect(action: 'list')
    }

    def list() {
        def responseJSON = [:]

        def modules = Module.findAll().sort{a,b -> a.name.compareTo(b.name)};

        responseJSON.modules = []

        modules.each { Module module ->
            def timeLevels = [:]
            def moduleMap = [id: module.id, name: module.name, subModules: []]
            module.subModules.each { SubModule subModule ->
                def subModuleMap = [id: subModule.id, name: subModule.name, timeIncrementMeasurements: []]
                def timeIncrementMap = [:]
                subModule.timeIncrementMeasurements.each {

                    // Add total to parent
                    if (!timeLevels.get(it.incrementNumber)) {
                        timeLevels[it.incrementNumber] = 0.0
                    }

                    timeLevels[it.incrementNumber] = timeLevels[it.incrementNumber] + it.level

                    // Store it
                    timeIncrementMap.put(it.incrementNumber, it.level)

                }
                // done with increments. add them to submodule
                def keys = timeIncrementMap.keySet().sort{a,b-> a.compareTo(b)}
                keys.each {
                    subModuleMap.timeIncrementMeasurements.add(["${it}": timeIncrementMap.get(it)])
                }

                subModuleMap.level = timeIncrementMap.get(keys.get(keys[keys.size() - 1]))

                // add submodule to parent
                moduleMap.subModules.add(subModuleMap)
            }
            moduleMap.subModules = moduleMap.subModules.sort { a, b -> a.name.compareTo(b.name) }

            def times = []
            timeLevels.keySet().each {
                times.add([increment: it, level: timeLevels.get(it)])
            }
            times.sort { a, b -> a.increment.compareTo(b.increment) }
            def level = timeLevels.get(times.get(times.size() - 1).increment)
            moduleMap.timeIncrementMeasurements = times
            moduleMap.level = level

            responseJSON.modules.add(moduleMap)
        }
        render responseJSON as JSON
    }
}
