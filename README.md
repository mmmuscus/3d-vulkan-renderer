# 3D renderer in Vulkan

This was my first deeper dive into Vulkan. It was created during university for a class where we needed to create a bigger stand-alone project as practice for our Bsc thesis. The program is capable of rendering multiples of the same (single mesh) model with the same texture. It also shades the models with a simple diffuse lighting to help demonstrate the normal mapping. Similar to the textures only one normal map can be used for all of the models.

We can see the final result below:

![image](https://github.com/mmmuscus/vulkan-3d-renderer/assets/32553610/cb013727-8daa-49e9-adc3-1588ace65186)

Below are some renders displaying the normals of the models before and after applying normal mapping. The normal map looks unnatural this is because I used a random normal map that didnt match the model or the texture. This was due to time constraints, my main goal was to show that the renderer is capable of applying normal maps.

![image](https://github.com/mmmuscus/vulkan-3d-renderer/assets/32553610/2434a525-1654-4498-9575-cfe736284d38)
![image](https://github.com/mmmuscus/vulkan-3d-renderer/assets/32553610/5e103c5c-560b-4d18-8fc5-a8917a1aa6c4)
