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

layout(location = 0) out vec4 outColor;

vec3 shade(vec3 normal, vec3 lightDir, float lightDist, vec3 powerDensity, vec3 materialColor) {
    float cosa = clamp(dot(lightDir, normal), 0.0, 1.0);

    return cosa * powerDensity / (lightDist * lightDist) * materialColor;
}

void main() {
    /*outColor = texture(texSampler, fragTexCoord);
    outColor = vec4(normal, 1.0);*/

    vec3 lightDir = scene.lightPos.xyz - worldPos;

    outColor = vec4(0.0, 0.0, 0.0, 1.0);
    outColor.xyz += shade(normalize(normal), normalize(lightDir), length(lightDir), scene.lightPowerDensity.xyz, texture(normalMapSampler, fragTexCoord).xyz);

    // Displaying depth buffer for testing
    /*float near = 0.1;
    float far = 10.0;

    float z = gl_FragCoord.z * 2.0 - 1.0;
    float depth = (2.0 * near * far) / (far + near - z * (far - near));
    depth = depth / far;
    outColor = vec4(vec3(depth), 1.0);*/
}
