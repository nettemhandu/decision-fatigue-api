package com.antonette.decisionfatigue;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {
		"tmdb.apiKey=test-key"
})
class DecisionfatigueApplicationTests {

	@Test
	void contextLoads() {
		// This test verifies that the application context loads successfully
	}
}