package d3demo

class SubModule {

    String name

    static hasMany = [timeIncrementMeasurements: TimeIncrementMeasurement]

    static belongsTo = [parent: Module]

    static constraints = {
    }
}
