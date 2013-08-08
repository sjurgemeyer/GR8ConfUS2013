package d3demo

class ModuleService {

    def randomize() {

        TimeIncrementMeasurement.findAll().each {it.delete()}
        SubModule.findAll().each {it.delete()}
        Module.findAll().each {it.delete()}

        def random = new Random()
        def letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

        for(parent in 0..9) {
            def module = new Module(name: "Module ${letters[parent]}")

            def subsMap = [:]
            def subCount = random.nextInt(3) + 2

            for(sub in 0..subCount) {
                subsMap.put(sub, new SubModule(name: "${letters[parent]} Submodule ${sub + 1}"))
            }

            for(increment in 0..5) {
                for(sub in 0..subCount) {
                    SubModule subModule = subsMap.get(sub)
                    subModule.addToTimeIncrementMeasurements(new TimeIncrementMeasurement(incrementNumber: increment, level: random.nextInt(10) + 1))
                }
            }

            subsMap.values().each {SubModule subModule ->
                module.addToSubModules(subModule)
            }
            module.save(failOnError: true)
        }

    }
}
