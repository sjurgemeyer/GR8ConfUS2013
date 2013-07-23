import grails.test.GrailsUnitTestCase

class SampleDomainTests extends GrailsUnitTestCase {

    protected void setUp() {
        super.setUp()
        mockDomain(SampleDomain)
    }

    protected void tearDown() {

    }

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