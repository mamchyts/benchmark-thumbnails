# Thumbnails benchmark

imgproxy:
    320x240 http://localhost:8080/unsafe/fill/320/240/ce/1/plain/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    854x480 http://localhost:8080/unsafe/fill/854/480/ce/1/plain/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    1280x720 http://localhost:8080/unsafe/fill/1280/720/ce/1/plain/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg

thumbor:
    320x240 http://localhost:8081/unsafe/320x240/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    854x480 http://localhost:8081/unsafe/854x480/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    1280x720 http://localhost:8081/unsafe/1280x720/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg

thumbor-cache:
    320x240 http://localhost:8082/unsafe/320x240/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    854x480 http://localhost:8082/unsafe/854x480/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    1280x720 http://localhost:8082/unsafe/1280x720/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg

imaginary:
    320x240 http://localhost:8083/enlarge?width=320&height=240&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    854x480 http://localhost:8083/enlarge?width=854&height=480&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    1280x720 http://localhost:8083/enlarge?width=1280&height=720&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg

picfit:
    320x240 http://localhost:8084/display?w=320&h=240&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    854x480 http://localhost:8084/display?w=854&h=480&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    1280x720 http://localhost:8084/display?w=1280&h=720&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg

picfit-cache:
    320x240 http://localhost:8085/display?w=320&h=240&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    854x480 http://localhost:8085/display?w=854&h=480&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    1280x720 http://localhost:8085/display?w=1280&h=720&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg

imageproxy:
    320x240 http://localhost:8086/320x240/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/nature-wallpaper-1920x1080.jpg
    854x480 http://localhost:8086/854x480/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/nature-wallpaper-1920x1080.jpg
    1280x720 http://localhost:8086/1280x720/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/nature-wallpaper-1920x1080.jpg

imageproxy-cache:
    320x240 http://localhost:8087/320x240/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/nature-wallpaper-1920x1080.jpg
    854x480 http://localhost:8087/854x480/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/nature-wallpaper-1920x1080.jpg
    1280x720 http://localhost:8087/1280x720/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/nature-wallpaper-1920x1080.jpg
