#ifndef CAMERA_H
#define CAMERA_H

#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>

#include <vector>

enum Direction {
	FORWARD, BACKWARD, LEFT, RIGHT, UP, DOWN
};

// Default values
const float YAW = -90.0f;
const float PITCH = 0.0f;
const float SPEED = 2.5f;
const float SENS = 0.1f;

class Camera
{
public: 
	glm::vec3 pos;
	glm::vec3 forward;
	glm::vec3 up;
	glm::vec3 right;
	glm::vec3 worldUp;

	float yaw;
	float pitch;

	float moveSpeed;
	float mouseSens;

	Camera(glm::vec3 _pos, glm::vec3 _forward, glm::vec3 _worldUp, float _yaw = YAW, float _pitch = PITCH, float _moveSpeed = SPEED, float _mouseSens = SENS)
	{
		pos = _pos;
		forward = _forward;
		worldUp = _worldUp;
		yaw = _yaw;
		pitch = _pitch;
		moveSpeed = _moveSpeed;
		mouseSens = _mouseSens;

		updateCameraVectors();
	}

	glm::mat4 getViewMatrix()
	{
		return glm::lookAt(pos, pos + forward, up);
	}

	void processKeyboard(Direction dir, float deltaTime)
	{
		float velocity = moveSpeed * deltaTime;
		if (dir == FORWARD)
			pos += forward * velocity;
		if (dir == BACKWARD)
			pos -= forward * velocity;
		if (dir == RIGHT)
			pos += right * velocity;
		if (dir == LEFT)
			pos -= right * velocity;
		if (dir == UP)
			pos += up * velocity;
		if (dir == DOWN)
			pos -= up * velocity;
	}

	void processMouseMovement(float x, float y)
	{
		x *= mouseSens;
		y *= mouseSens;

		yaw += x;
		pitch += y;

		if (pitch > 89.0f)
			pitch = 89.0f;
		if (pitch < -89.0f)
			pitch = -89.0f;

		updateCameraVectors();
	}

private:

	void updateCameraVectors()
	{
		/*glm::vec3 newForward;
		newForward.x = cos(glm::radians(yaw)) * cos(glm::radians(pitch));
		newForward.y = sin(glm::radians(pitch));
		newForward.z = sin(glm::radians(yaw)) * cos(glm::radians(pitch));

		forward = glm::normalize(newForward);*/

		right = glm::normalize(glm::cross(forward, worldUp));
		up = glm::normalize(glm::cross(right, forward));
	}
};

#endif