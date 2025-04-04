package com.cilantro.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.is;

@SpringBootTest
@AutoConfigureMockMvc
class BackendApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper; // For converting objects to JSON

	private final String testUsername = "test_user";
	private final String testPassword = "test_password";
	private final String testEmail = UUID.randomUUID().toString() + "@example.com";

	@Test
	void testRegisterLoginAndVerifyWelcome() throws Exception {
		// 1. Register a new user
		Map<String, String> registrationData = new HashMap<>();
		registrationData.put("username", testUsername);
		registrationData.put("password", testPassword);
		registrationData.put("email", testEmail);

		mockMvc.perform(post("/api/auth/register") // Assuming your registration endpoint is /api/auth/register
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(registrationData)))
				.andExpect(status().isOk()); // Or isCreated(), depending on your endpoint

		// 2. Log in as that user
		Map<String, String> loginData = new HashMap<>();
		loginData.put("username", testUsername);
		loginData.put("password", testPassword);

		ResultActions loginResult = mockMvc.perform(post("/api/auth/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(loginData)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").exists()); // Verify a token is returned

		String token = objectMapper.readTree(loginResult.andReturn().getResponse().getContentAsString()).get("token").asText();

		// 3. Verify the UI shows "welcome X" (Backend Verification)
		// Make a request to a protected endpoint using the token
		mockMvc.perform(get("/api/auth/me")
					.header("Authorization", "Bearer " + token))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.username", is(testUsername))); // Assuming your /me endpoint returns username
	}
}