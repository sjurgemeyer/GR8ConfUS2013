import grails.test.mixin.TestFor

@TestFor(SampleDomain)
class SampleDomainTests {

    void testDomainProperties() {
        SampleDomain sample = new SampleDomain(
                name: 'sample',
                name_sourceId: 'sampleSource',
                dateOfBirth: new Date(),
                dateOfBirth_sourceId: 'anotherSource'
        )
        assert sample.validate()
    }
}