#version 450

layout(binding = 1) uniform sampler2D texSampler;

layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec2 fragTexCoord;
layout(location = 2) in vec3 normal;
layout(location = 3) in vec3 worldPos;

layout(location = 0) out vec4 outColor;

vec3 shade(vec3 normal, vec3 lightDir, vec3 powerDensity, vec3 materialColor) {
    float cosa = dot(lightDir, normal);

    return cosa * powerDensity * materialColor;
}

vec3 testLightPowerDensity = vec3(5.0, 5.0, 5.0);
vec3 testLightPos = vec3(0.0, 0.2, 1.5);

void main() {
    //outColor = texture(texSampler, fragTexCoord);
    //outColor = vec4(normal, 1.0);

    vec3 lightDir = normalize(testLightPos - worldPos);

    outColor = vec4(0.0, 0.0, 0.0, 1.0);
    outColor.xyz += shade(normalize(normal), normalize(testLightPos), testLightPowerDensity, texture(texSampler, fragTexCoord).xyz);
}
