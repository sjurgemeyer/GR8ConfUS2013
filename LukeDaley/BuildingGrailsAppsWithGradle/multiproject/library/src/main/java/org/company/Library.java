package org.company;

import org.apache.commons.lang.RandomStringUtils;

public class Library {
    public static String randomString() {
        return RandomStringUtils.random(10);
    }
}
