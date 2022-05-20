#version 450

layout(binding = 1) uniform sampler2D texSampler;
layout(binding = 3) uniform sampler2D normalMapSampler;

layout(binding = 2) uniform SceneBufferObject {
    mat4 viewMatrix;
    mat4 projMatrix;
    
    vec4 lightPos;
    vec4 lightPowerDensity;
} scene;

layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec2 fragTexCoord;
layout(location = 2) in vec3 normal;
layout(location = 3) in vec3 worldPos;
layout(location = 4) in mat3 TBN;

layout(location = 0) out vec4 outColor;

vec3 shade(vec3 normal, vec3 lightDir, float lightDist, vec3 powerDensity, vec3 materialColor) {
    float cosa = clamp(dot(lightDir, normal), 0.0, 1.0);

    return cosa * powerDensity / (lightDist * lightDist) * materialColor;
}

void main() {
    vec3 lightDir = scene.lightPos.xyz - worldPos;

    vec3 normalMapNormal = texture(normalMapSampler, fragTexCoord).xyz;
    normalMapNormal = normalMapNormal * 2.0 - 1.0;
    normalMapNormal = normalize(TBN * normalMapNormal);

    outColor = vec4(0.0, 0.0, 0.0, 1.0);
    outColor.xyz += shade(normalMapNormal, normalize(lightDir), length(lightDir), scene.lightPowerDensity.xyz, texture(texSampler, fragTexCoord).xyz);
}
