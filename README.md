# Thumbnails benchmark



|             | imgproxy            | thumbor             | thumbor (with `file_storage` cache) | imaginary           | picfit              | picfit (with cache) | imageproxy          | imageproxy (with cache) |
| ----------- | ------------------- | ------------------- | ----------------------------------- | ------------------- | ------------------- | ------------------- | --------------------| ----------------------- |
| 320x240     | 73.08ms (13.77 rps) | 90.51ms (11.09 rps) | 1.79ms (893.27 rps)                 | 73.08ms (13.77 rps) | 73.08ms (13.77 rps) | 73.08ms (13.77 rps) | 73.08ms (13.77 rps) | 73.08ms (13.77 rps)     |
| 854x480     | 113.52ms (8.83 rps) | 84.06ms (11.93 rps) | 1.33ms (754.58 rps)                 | 73.08ms (13.77 rps) | 73.08ms (13.77 rps) | 73.08ms (13.77 rps) | 73.08ms (13.77 rps) | 73.08ms (13.77 rps)     |
| 1280x720    | 168.57ms (5.94 rps) | 186.55ms (5.34 rps) | 2.24ms (595.12 rps)                 | 73.08ms (13.77 rps) | 73.08ms (13.77 rps) | 73.08ms (13.77 rps) | 73.08ms (13.77 rps) | 73.08ms (13.77 rps)     |


imgproxy:
    320x240
        ./wrk -t1 -c1 -d60s http://localhost:8080/unsafe/fill/320/240/ce/1/plain/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    854x480
        ./wrk -t1 -c1 -d60s http://localhost:8080/unsafe/fill/854/480/ce/1/plain/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    1280x720
        ./wrk -t1 -c1 -d60s http://localhost:8080/unsafe/fill/1280/720/ce/1/plain/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg

thumbor:
    320x240
        ./wrk -t1 -c1 -d60s http://localhost:8081/unsafe/320x240/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    854x480
        ./wrk -t1 -c1 -d60s http://localhost:8081/unsafe/854x480/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    1280x720
        ./wrk -t1 -c1 -d60s http://localhost:8081/unsafe/1280x720/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg

thumbor-cache:
    320x240
        ./wrk -t1 -c1 -d60s http://localhost:8082/unsafe/320x240/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    854x480
        ./wrk -t1 -c1 -d60s http://localhost:8082/unsafe/854x480/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    1280x720
        ./wrk -t1 -c1 -d60s http://localhost:8082/unsafe/1280x720/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg

imaginary:
    320x240
./wrk -t1 -c1 -d60s 'http://localhost:8083/enlarge?width=320&height=240&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg'
    854x480
        ./wrk -t1 -c1 -d60s 'http://localhost:8083/enlarge?width=854&height=480&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg'
    1280x720
        ./wrk -t1 -c1 -d60s 'http://localhost:8083/enlarge?width=1280&height=720&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg'

picfit:
    320x240
        ./wrk -t1 -c1 -d60s http://localhost:8084/display?w=320&h=240&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    854x480
        ./wrk -t1 -c1 -d60s http://localhost:8084/display?w=854&h=480&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    1280x720
        ./wrk -t1 -c1 -d60s http://localhost:8084/display?w=1280&h=720&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg

picfit-cache:
    320x240
        ./wrk -t1 -c1 -d60s http://localhost:8085/display?w=320&h=240&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    854x480
        ./wrk -t1 -c1 -d60s http://localhost:8085/display?w=854&h=480&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg
    1280x720
        ./wrk -t1 -c1 -d60s http://localhost:8085/display?w=1280&h=720&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fnature-wallpaper-1920x1080.jpg

imageproxy:
    320x240
        ./wrk -t1 -c1 -d60s http://localhost:8086/320x240/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/nature-wallpaper-1920x1080.jpg
    854x480
        ./wrk -t1 -c1 -d60s http://localhost:8086/854x480/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/nature-wallpaper-1920x1080.jpg
    1280x720
        ./wrk -t1 -c1 -d60s http://localhost:8086/1280x720/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/nature-wallpaper-1920x1080.jpg

imageproxy-cache:
    320x240
        ./wrk -t1 -c1 -d60s http://localhost:8087/320x240/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/nature-wallpaper-1920x1080.jpg
    854x480
        ./wrk -t1 -c1 -d60s http://localhost:8087/854x480/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/nature-wallpaper-1920x1080.jpg
    1280x720
        ./wrk -t1 -c1 -d60s http://localhost:8087/1280x720/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/nature-wallpaper-1920x1080.jpg
