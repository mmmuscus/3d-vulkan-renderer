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
layout(location = 4) in vec3 inTangent;
layout(location = 5) in vec3 inBiTangent;

layout(location = 0) out vec3 fragColor;
layout(location = 1) out vec2 fragTexCoord;
layout(location = 2) out vec3 normal;
layout(location = 3) out vec3 worldPos;
layout(location = 4) out mat3 TBN;

void main() {
    gl_Position = scene.projMatrix * scene.viewMatrix * model.modelMatrix * vec4(inPosition, 1.0);
    worldPos = (model.modelMatrix * vec4(inPosition, 1.0)).xyz;

    fragColor = inColor;
    fragTexCoord = inTexCoord;
    normal = inNormal;

    vec3 T = normalize(vec3(model.modelMatrix * vec4(inTangent, 0.0)));
    vec3 B = normalize(vec3(model.modelMatrix * vec4(inBiTangent, 0.0)));
    vec3 N = normalize(vec3(model.modelMatrix * vec4(inNormal, 0.0)));
    TBN = mat3(T, B, N);
}