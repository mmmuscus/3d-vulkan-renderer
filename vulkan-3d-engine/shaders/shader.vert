#version 450

layout(binding = 0) uniform ModelBufferObject {
    mat4 modelMatrix;
} model;

layout(binding = 2) uniform SceneBufferObject {
    mat4 viewMatrix;
    mat4 projMatrix;
    
    vec4 lightPos;
    vec4 lightPowerDensity;
} scene;

layout(location = 0) in vec3 inPosition;
layout(location = 1) in vec3 inNormal;
layout(location = 2) in vec3 inColor;
layout(location = 3) in vec2 inTexCoord;

layout(location = 0) out vec3 fragColor;
layout(location = 1) out vec2 fragTexCoord;
layout(location = 2) out vec3 normal;
layout(location = 3) out vec3 worldPos;

void main() {
    gl_Position = scene.projMatrix * scene.viewMatrix * model.modelMatrix * vec4(inPosition, 1.0);
    fragColor = inColor;
    fragTexCoord = inTexCoord;
    normal = inNormal;
    worldPos = (model.modelMatrix * vec4(inPosition, 1.0)).xyz;
}