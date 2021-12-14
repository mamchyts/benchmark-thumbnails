# Thumbnails benchmark

Test PC - **AWS t2.small**:
```
$ free -h
              total        used        free      shared  buff/cache   available
Mem:          1.9Gi       622Mi       428Mi       5.0Mi       924Mi       1.2Gi
Swap:            0B          0B          0B
```

```
$ lscpu
Architecture:                    x86_64
CPU op-mode(s):                  32-bit, 64-bit
Byte Order:                      Little Endian
Address sizes:                   46 bits physical, 48 bits virtual
CPU(s):                          1
On-line CPU(s) list:             0
Thread(s) per core:              1
Core(s) per socket:              1
Socket(s):                       1
NUMA node(s):                    1
Vendor ID:                       GenuineIntel
CPU family:                      6
Model:                           79
Model name:                      Intel(R) Xeon(R) CPU E5-2686 v4 @ 2.30GHz
Stepping:                        1
CPU MHz:                         2299.889
BogoMIPS:                        4600.04
Hypervisor vendor:               Xen
Virtualization type:             full
L1d cache:                       32 KiB
L1i cache:                       32 KiB
L2 cache:                        256 KiB
L3 cache:                        45 MiB
NUMA node0 CPU(s):               0
Vulnerability Itlb multihit:     KVM: Mitigation: VMX unsupported
Vulnerability L1tf:              Mitigation; PTE Inversion
Vulnerability Mds:               Vulnerable: Clear CPU buffers attempted, no microcode; SMT Host state unknown
Vulnerability Meltdown:          Mitigation; PTI
Vulnerability Spec store bypass: Vulnerable
Vulnerability Spectre v1:        Mitigation; usercopy/swapgs barriers and __user pointer sanitization
Vulnerability Spectre v2:        Mitigation; Full generic retpoline, STIBP disabled, RSB filling
Vulnerability Srbds:             Not affected
Vulnerability Tsx async abort:   Not affected
Flags:                           fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ht
                                  syscall nx rdtscp lm constant_tsc rep_good nopl xtopology cpuid tsc_known_freq pni pclmulqdq ssse3
                                 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervi
                                 sor lahf_lm abm cpuid_fault invpcid_single pti fsgsbase bmi1 avx2 smep bmi2 erms invpcid xsaveopt
```



|           | imgproxy/imgproxy          | thumbor/thumbor            | thumbor/thumbor (cache)    | imaginary                   | picfit                     | picfit (cache)              | imageproxy                 | imageproxy (cache)          | weserv/images              | weserv/images (cache)       |
| --------- | -------------------------- | -------------------------- | -------------------------- | --------------------------- | -------------------------- | --------------------------- | -------------------------- | --------------------------- | -------------------------- | --------------------------- |
| 320x240   | 221.96ms (4.51 rps, 100MB) | 612.27ms (1.63 rps, 160MB) | 6.26ms (637.93 rps, 56MB)  | 238.76ms (4.22 rps, 1000MB) | 1240.0ms (0.80 rps, 280MB) | 1.03ms (1191.61 rps, 40MB)  | 1230.0ms (0.80 rps, 260MB) | 14.41ms (2181.57 rps, 60MB) | 253.60ms (3.93 rps, 90MB)  | 1.22ms (4391.25 rps, 45MB)  |
| 854x480   | 255.65ms (3.90 rps, 110MB) | 648.81ms (1.53 rps, 170MB) | 5.11ms (624.78 rps, 60MB)  | 251.33ms (3.97 rps, 1200MB) | 1320.0ms (0.75 rps, 280MB) | 32.18ms (879.33 rps, 230MB) | 1350.0ms (0.73 rps, 270MB) | 15.65ms (1788.64 rps, 70MB) | 283.46ms (3.51 rps, 100MB) | 1.98ms (3830.48 rps, 65MB)  |
| 1280x720  | 283.46ms (3.53 rps, 110MB) | 707.45ms (1.40 rps, 180MB) | 5.78ms (593.79 rps, 65MB)  | 381.63ms (2.62 rps, 650MB)  | 1400.0ms (0.70 rps, 280MB) | 49.78ms (632.48 rps, 200MB) | 1420.0ms (0.70 rps, 280MB) | 18.59ms (1195.69 rps, 70MB) | 317.36ms (3.15 rps, 120MB) | 2.26ms (3684.97 rps, 65MB)  |
| 1920x1080 | 412.16ms (2.41 rps, 140MB) | 816.26ms (1.22 rps, 190MB) | 7.25ms (559.34 rps, 70MB)  | 334.40ms (2.98 rps, 600MB)  | 1560.0ms (0.63 rps, 290MB) | 87.13ms (264.14 rps, 200MB) | 1650.0ms (0.60 rps, 300MB) | 24.24ms (731.56 rps, 80MB)  | 453.88ms (2.20 rps, 130MB) | 3.66ms (3247.83 rps, 70MB)  |
| 3840x2160 | 977.99ms (1.03 rps, 200MB) | 1370.0ms (0.72 rps, 200MB) | 17.98ms (317.67 rps, 75MB) | 685.37ms (1.45 rps, 600MB)  | 1670.0ms (0.45 rps, 300MB) | 99.13ms (101.69 rps, 200MB) | 1850.0ms (0.38 rps, 340MB) | 28.20ms (309.14 rps, 80MB)  | 1070.0ms (0.93 rps, 160MB) | 19.74ms (1760.26 rps, 70MB) |


![https://quickchart.io/sandbox/#%7B%0A%20%20%22type%22%3A%20%22horizontalBar%22%2C%0A%20%20%22data%22%3A%20%7B%0A%20%20%20%20%22labels%22%3A%20%5B%0A%20%20%20%20%20%20%22imgproxy%22%2C%0A%20%20%20%20%20%20%22thumbor%22%2C%0A%20%20%20%20%20%20%22thumbor%20(with%20cache)%22%2C%0A%20%20%20%20%20%20%22imaginary%22%2C%0A%20%20%20%20%20%20%22picfit%22%2C%0A%20%20%20%20%20%20%22picfit%20(with%20cache)%22%2C%0A%20%20%20%20%20%20%22imageproxy%22%2C%0A%20%20%20%20%20%20%22imageproxy%20(with%20cache)%22%2C%0A%20%20%20%20%20%20%22weserv%2Fimages%22%2C%0A%20%20%20%20%20%20%22weserv%2Fimages%20(without%20cache)%22%0A%20%20%20%20%5D%2C%0A%20%20%20%20%22datasets%22%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22label%22%3A%20%22320x240%22%2C%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%22rgba(54%2C%20162%2C%20235%2C%200.5)%22%2C%0A%20%20%20%20%20%20%20%20%22borderColor%22%3A%20%22rgb(54%2C%20162%2C%20235)%22%2C%0A%20%20%20%20%20%20%20%20%22borderWidth%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%2071.90%2C%0A%20%20%20%20%20%20%20%20%20%2090.51%2C%0A%20%20%20%20%20%20%20%20%20%201.79%2C%0A%20%20%20%20%20%20%20%20%20%2069.55%2C%0A%20%20%20%20%20%20%20%20%20%20238.91%2C%0A%20%20%20%20%20%20%20%20%20%208.23%2C%0A%20%20%20%20%20%20%20%20%20%20226.29%2C%0A%20%20%20%20%20%20%20%20%20%202.41%2C%0A%20%20%20%20%20%20%20%20%20%200.5%2C%0A%20%20%20%20%20%20%20%20%20%2070.28%2C%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22label%22%3A%20%22854x480%22%2C%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%22rgba(255%2C%2099%2C%20132%2C%200.5)%22%2C%0A%20%20%20%20%20%20%20%20%22borderColor%22%3A%20%22rgb(255%2C%2099%2C%20132)%22%2C%0A%20%20%20%20%20%20%20%20%22borderWidth%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20105.17%2C%0A%20%20%20%20%20%20%20%20%20%2084.06%2C%0A%20%20%20%20%20%20%20%20%20%201.33%2C%0A%20%20%20%20%20%20%20%20%20%2089.84%2C%0A%20%20%20%20%20%20%20%20%20%20303.05%2C%0A%20%20%20%20%20%20%20%20%20%204.56%2C%0A%20%20%20%20%20%20%20%20%20%20295.18%2C%0A%20%20%20%20%20%20%20%20%20%201.63%2C%0A%20%20%20%20%20%20%20%20%20%200.6%2C%0A%20%20%20%20%20%20%20%20%20%20111.55%2C%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22label%22%3A%20%221280x720%22%2C%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%22rgb(201%2C%20203%2C%20207)%22%2C%0A%20%20%20%20%20%20%20%20%22borderColor%22%3A%20%22rgb(154%2C%20162%2C%20235)%22%2C%0A%20%20%20%20%20%20%20%20%22borderWidth%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20168.57%2C%0A%20%20%20%20%20%20%20%20%20%20186.55%2C%0A%20%20%20%20%20%20%20%20%20%202.24%2C%0A%20%20%20%20%20%20%20%20%20%20104.65%2C%0A%20%20%20%20%20%20%20%20%20%20345.35%2C%0A%20%20%20%20%20%20%20%20%20%206.31%2C%0A%20%20%20%20%20%20%20%20%20%20373.96%2C%0A%20%20%20%20%20%20%20%20%20%202.40%2C%0A%20%20%20%20%20%20%20%20%20%201.34%2C%0A%20%20%20%20%20%20%20%20%20%20198.45%2C%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22label%22%3A%20%223840x2160%22%2C%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%22rgb(50%2C%20163%2C%20177)%22%2C%0A%20%20%20%20%20%20%20%20%22borderColor%22%3A%20%22rgb(154%2C%20162%2C%20235)%22%2C%0A%20%20%20%20%20%20%20%20%22borderWidth%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20669.91%2C%0A%20%20%20%20%20%20%20%20%20%20855.83%2C%0A%20%20%20%20%20%20%20%20%20%2014.35%2C%0A%20%20%20%20%20%20%20%20%20%20509.45%2C%0A%20%20%20%20%20%20%20%20%20%20956.23%2C%0A%20%20%20%20%20%20%20%20%20%2047.13%2C%0A%20%20%20%20%20%20%20%20%20%201250.0%2C%0A%20%20%20%20%20%20%20%20%20%2022.20%2C%0A%20%20%20%20%20%20%20%20%20%204.27%2C%0A%20%20%20%20%20%20%20%20%20%201020.0%2C%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%5D%0A%20%20%7D%2C%0A%20%20%22options%22%3A%20%7B%0A%20%20%20%20%22plugins%22%3A%20%7B%0A%20%20%20%20%20%20%22datalabels%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22anchor%22%3A%20%22end%22%2C%0A%20%20%20%20%20%20%20%20%22align%22%3A%20%22end%22%2C%0A%20%20%20%20%20%20%20%20%22color%22%3A%20%22%23000%22%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22responsive%22%3A%20true%2C%0A%20%20%20%20%22legend%22%3A%20%7B%0A%20%20%20%20%20%20%22position%22%3A%20%22top%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22title%22%3A%20%7B%0A%20%20%20%20%20%20%22display%22%3A%20true%2C%0A%20%20%20%20%20%20%22text%22%3A%20%22Rendering%20time%20in%20milliseconds%20(lower%20is%20better)%22%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D](./chart-time.png)

![https://quickchart.io/sandbox/#%7B%0A%20%20%22type%22%3A%20%22horizontalBar%22%2C%0A%20%20%22data%22%3A%20%7B%0A%20%20%20%20%22labels%22%3A%20%5B%0A%20%20%20%20%20%20%22imgproxy%22%2C%0A%20%20%20%20%20%20%22thumbor%22%2C%0A%20%20%20%20%20%20%22thumbor%20(with%20cache)%22%2C%0A%20%20%20%20%20%20%22imaginary%22%2C%0A%20%20%20%20%20%20%22picfit%22%2C%0A%20%20%20%20%20%20%22picfit%20(with%20cache)%22%2C%0A%20%20%20%20%20%20%22imageproxy%22%2C%0A%20%20%20%20%20%20%22imageproxy%20(with%20cache)%22%2C%0A%20%20%20%20%20%20%22weserv%2Fimages%22%2C%0A%20%20%20%20%20%20%22weserv%2Fimages%20(without%20cache)%22%0A%20%20%20%20%5D%2C%0A%20%20%20%20%22datasets%22%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22label%22%3A%20%22320x240%22%2C%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%22rgba(54%2C%20162%2C%20235%2C%200.5)%22%2C%0A%20%20%20%20%20%20%20%20%22borderColor%22%3A%20%22rgb(54%2C%20162%2C%20235)%22%2C%0A%20%20%20%20%20%20%20%20%22borderWidth%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%2060%2C%0A%20%20%20%20%20%20%20%20%20%2060%2C%0A%20%20%20%20%20%20%20%20%20%2050%2C%0A%20%20%20%20%20%20%20%20%20%20200%2C%0A%20%20%20%20%20%20%20%20%20%2050%2C%0A%20%20%20%20%20%20%20%20%20%2040%2C%0A%20%20%20%20%20%20%20%20%20%2060%2C%0A%20%20%20%20%20%20%20%20%20%2040%2C%0A%20%20%20%20%20%20%20%20%20%2040%2C%0A%20%20%20%20%20%20%20%20%20%2045%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22label%22%3A%20%22854x480%22%2C%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%22rgba(255%2C%2099%2C%20132%2C%200.5)%22%2C%0A%20%20%20%20%20%20%20%20%22borderColor%22%3A%20%22rgb(255%2C%2099%2C%20132)%22%2C%0A%20%20%20%20%20%20%20%20%22borderWidth%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%2065%2C%0A%20%20%20%20%20%20%20%20%20%2065%2C%0A%20%20%20%20%20%20%20%20%20%2050%2C%0A%20%20%20%20%20%20%20%20%20%20320%2C%0A%20%20%20%20%20%20%20%20%20%2060%2C%0A%20%20%20%20%20%20%20%20%20%2040%2C%0A%20%20%20%20%20%20%20%20%20%2070%2C%0A%20%20%20%20%20%20%20%20%20%2040%2C%0A%20%20%20%20%20%20%20%20%20%2040%2C%0A%20%20%20%20%20%20%20%20%20%2055%2C%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22label%22%3A%20%221280x720%22%2C%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%22rgb(201%2C%20203%2C%20207)%22%2C%0A%20%20%20%20%20%20%20%20%22borderColor%22%3A%20%22rgb(154%2C%20162%2C%20235)%22%2C%0A%20%20%20%20%20%20%20%20%22borderWidth%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%2070%2C%0A%20%20%20%20%20%20%20%20%20%2070%2C%0A%20%20%20%20%20%20%20%20%20%2050%2C%0A%20%20%20%20%20%20%20%20%20%20380%2C%0A%20%20%20%20%20%20%20%20%20%2065%2C%0A%20%20%20%20%20%20%20%20%20%2040%2C%0A%20%20%20%20%20%20%20%20%20%2080%2C%0A%20%20%20%20%20%20%20%20%20%2040%2C%0A%20%20%20%20%20%20%20%20%20%2040%2C%0A%20%20%20%20%20%20%20%20%20%2065%2C%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22label%22%3A%20%223840x2160%22%2C%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%22rgb(50%2C%20163%2C%20177)%22%2C%0A%20%20%20%20%20%20%20%20%22borderColor%22%3A%20%22rgb(154%2C%20162%2C%20235)%22%2C%0A%20%20%20%20%20%20%20%20%22borderWidth%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20100%2C%0A%20%20%20%20%20%20%20%20%20%20120%2C%0A%20%20%20%20%20%20%20%20%20%2065%2C%0A%20%20%20%20%20%20%20%20%20%20510%2C%0A%20%20%20%20%20%20%20%20%20%20150%2C%0A%20%20%20%20%20%20%20%20%20%2070%2C%0A%20%20%20%20%20%20%20%20%20%20150%2C%0A%20%20%20%20%20%20%20%20%20%2050%2C%0A%20%20%20%20%20%20%20%20%20%2040%2C%0A%20%20%20%20%20%20%20%20%20%2090%2C%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%5D%0A%20%20%7D%2C%0A%20%20%22options%22%3A%20%7B%0A%20%20%20%20%22plugins%22%3A%20%7B%0A%20%20%20%20%20%20%22datalabels%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22anchor%22%3A%20%22end%22%2C%0A%20%20%20%20%20%20%20%20%22align%22%3A%20%22end%22%2C%0A%20%20%20%20%20%20%20%20%22color%22%3A%20%22%23000%22%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22responsive%22%3A%20true%2C%0A%20%20%20%20%22legend%22%3A%20%7B%0A%20%20%20%20%20%20%22position%22%3A%20%22top%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22title%22%3A%20%7B%0A%20%20%20%20%20%20%22display%22%3A%20true%2C%0A%20%20%20%20%20%20%22text%22%3A%20%22Memory%20usage%20in%20MB%20(lower%20is%20better)%22%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D](./chart-memory.png)

![https://quickchart.io/sandbox/#%7B%0A%20%20%22type%22%3A%20%22horizontalBar%22%2C%0A%20%20%22data%22%3A%20%7B%0A%20%20%20%20%22labels%22%3A%20%5B%0A%20%20%20%20%20%20%22imgproxy%22%2C%0A%20%20%20%20%20%20%22thumbor%22%2C%0A%20%20%20%20%20%20%22thumbor%20(with%20cache)%22%2C%0A%20%20%20%20%20%20%22imaginary%22%2C%0A%20%20%20%20%20%20%22picfit%22%2C%0A%20%20%20%20%20%20%22picfit%20(with%20cache)%22%2C%0A%20%20%20%20%20%20%22imageproxy%22%2C%0A%20%20%20%20%20%20%22imageproxy%20(with%20cache)%22%2C%0A%20%20%20%20%20%20%22weserv%2Fimages%22%2C%0A%20%20%20%20%20%20%22weserv%2Fimages%20(without%20cache)%22%2C%0A%20%20%20%20%5D%2C%0A%20%20%20%20%22datasets%22%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22label%22%3A%20%22320x240%22%2C%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%22rgba(54%2C%20162%2C%20235%2C%200.5)%22%2C%0A%20%20%20%20%20%20%20%20%22borderColor%22%3A%20%22rgb(54%2C%20162%2C%20235)%22%2C%0A%20%20%20%20%20%20%20%20%22borderWidth%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%2014.02%2C%0A%20%20%20%20%20%20%20%20%20%2011.09%2C%0A%20%20%20%20%20%20%20%20%20%20893.27%2C%0A%20%20%20%20%20%20%20%20%20%2014.48%2C%0A%20%20%20%20%20%20%20%20%20%204.18%2C%0A%20%20%20%20%20%20%20%20%20%20922.42%2C%0A%20%20%20%20%20%20%20%20%20%204.41%2C%0A%20%20%20%20%20%20%20%20%20%203207.52%2C%0A%20%20%20%20%20%20%20%20%20%205242.17%2C%0A%20%20%20%20%20%20%20%20%20%2014.28%2C%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22label%22%3A%20%22854x480%22%2C%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%22rgba(255%2C%2099%2C%20132%2C%200.5)%22%2C%0A%20%20%20%20%20%20%20%20%22borderColor%22%3A%20%22rgb(255%2C%2099%2C%20132)%22%2C%0A%20%20%20%20%20%20%20%20%22borderWidth%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%209.55%2C%0A%20%20%20%20%20%20%20%20%20%2011.93%2C%0A%20%20%20%20%20%20%20%20%20%20754.58%2C%0A%20%20%20%20%20%20%20%20%20%2011.19%2C%0A%20%20%20%20%20%20%20%20%20%203.29%2C%0A%20%20%20%20%20%20%20%20%20%20490.97%2C%0A%20%20%20%20%20%20%20%20%20%203.38%2C%0A%20%20%20%20%20%20%20%20%20%201998.03%2C%0A%20%20%20%20%20%20%20%20%20%203921.71%2C%0A%20%20%20%20%20%20%20%20%20%209.06%2C%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22label%22%3A%20%221280x720%22%2C%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%22rgb(201%2C%20203%2C%20207)%22%2C%0A%20%20%20%20%20%20%20%20%22borderColor%22%3A%20%22rgb(154%2C%20162%2C%20235)%22%2C%0A%20%20%20%20%20%20%20%20%22borderWidth%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%205.94%2C%0A%20%20%20%20%20%20%20%20%20%205.34%2C%0A%20%20%20%20%20%20%20%20%20%20595.12%2C%0A%20%20%20%20%20%20%20%20%20%209.58%2C%0A%20%20%20%20%20%20%20%20%20%202.88%2C%0A%20%20%20%20%20%20%20%20%20%20320.05%2C%0A%20%20%20%20%20%20%20%20%20%202.68%2C%0A%20%20%20%20%20%20%20%20%20%201296.11%2C%0A%20%20%20%20%20%20%20%20%20%202647.82%2C%0A%20%20%20%20%20%20%20%20%20%205.03%2C%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22label%22%3A%20%223840x2160%22%2C%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%22rgb(50%2C%20163%2C%20177)%22%2C%0A%20%20%20%20%20%20%20%20%22borderColor%22%3A%20%22rgb(154%2C%20162%2C%20235)%22%2C%0A%20%20%20%20%20%20%20%20%22borderWidth%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%201.48%2C%0A%20%20%20%20%20%20%20%20%20%201.17%2C%0A%20%20%20%20%20%20%20%20%20%20202.75%2C%0A%20%20%20%20%20%20%20%20%20%201.95%2C%0A%20%20%20%20%20%20%20%20%20%201.03%2C%0A%20%20%20%20%20%20%20%20%20%2072.27%2C%0A%20%20%20%20%20%20%20%20%20%200.80%2C%0A%20%20%20%20%20%20%20%20%20%20309.14%2C%0A%20%20%20%20%20%20%20%20%20%20901.96%2C%0A%20%20%20%20%20%20%20%20%20%200.97%2C%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%5D%0A%20%20%7D%2C%0A%20%20%22options%22%3A%20%7B%0A%20%20%20%20%22plugins%22%3A%20%7B%0A%20%20%20%20%20%20%22datalabels%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22anchor%22%3A%20%22end%22%2C%0A%20%20%20%20%20%20%20%20%22align%22%3A%20%22end%22%2C%0A%20%20%20%20%20%20%20%20%22color%22%3A%20%22%23000%22%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22responsive%22%3A%20true%2C%0A%20%20%20%20%22legend%22%3A%20%7B%0A%20%20%20%20%20%20%22position%22%3A%20%22top%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22title%22%3A%20%7B%0A%20%20%20%20%20%20%22display%22%3A%20true%2C%0A%20%20%20%20%20%20%22text%22%3A%20%22RPS%20(bigger%20is%20better)%22%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D](./chart-rps.png)


Test image (5141x3434): https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg

Tests based on https://github.com/wg/wrk

[imgproxy/imgproxy](https://github.com/imgproxy/imgproxy):
```
    320x240
        ./wrk -t1 -c1 -d60s http://localhost:8080/insecure/rs:fill:320:240/el:true/g:ce:0:0/plain/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg
    854x480
        ./wrk -t1 -c1 -d60s http://localhost:8080/insecure/rs:fill:854:480/el:true/g:ce:0:0/plain/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg
    1280x720
        ./wrk -t1 -c1 -d60s http://localhost:8080/insecure/rs:fill:1280:720/el:true/g:ce:0:0/plain/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg
    1920x1080
        ./wrk -t1 -c1 -d60s http://localhost:8080/insecure/rs:fill:1920:1080/el:true/g:ce:0:0/plain/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg
    3840x2160
        ./wrk -t1 -c1 -d60s http://localhost:8080/insecure/rs:fill:3840:2160/el:true/g:ce:0:0/plain/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg
```

[thumbor/thumbor](https://github.com/thumbor/thumbor):
```
    320x240
        ./wrk -t1 -c1 -d60s http://localhost:8081/unsafe/320x240/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg
    854x480
        ./wrk -t1 -c1 -d60s http://localhost:8081/unsafe/854x480/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg
    1280x720
        ./wrk -t1 -c1 -d60s http://localhost:8081/unsafe/1280x720/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg
    1920x1080
        ./wrk -t1 -c1 -d60s http://localhost:8081/unsafe/1920x1080/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg
    3840x2160
        ./wrk -t1 -c1 -d60s http://localhost:8081/unsafe/3840x2160/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg


With enabled cache:

    320x240
        ./wrk -t1 -c1 -d60s http://localhost:8082/unsafe/320x240/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg
    854x480
        ./wrk -t1 -c1 -d60s http://localhost:8082/unsafe/854x480/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg
    1280x720
        ./wrk -t1 -c1 -d60s http://localhost:8082/unsafe/1280x720/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg
    1920x1080
        ./wrk -t1 -c1 -d60s http://localhost:8082/unsafe/1920x1080/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg
    3840x2160
        ./wrk -t1 -c1 -d60s http://localhost:8082/unsafe/3840x2160/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg
```

[h2non/imaginary](https://github.com/h2non/imaginary):
```
    320x240
        ./wrk -t1 -c1 -d60s 'http://localhost:8083/enlarge?width=320&height=240&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'
    854x480
        ./wrk -t1 -c1 -d60s 'http://localhost:8083/enlarge?width=854&height=480&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'
    1280x720
        ./wrk -t1 -c1 -d60s 'http://localhost:8083/enlarge?width=1280&height=720&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'
    1920x1080
        ./wrk -t1 -c1 -d60s 'http://localhost:8083/enlarge?width=1920&height=1080&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'
    3840x2160
        ./wrk -t1 -c1 -d60s 'http://localhost:8083/enlarge?width=3840&height=2160&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'

```

[thoas/picfit](https://github.com/thoas/picfit):
```
    320x240
        ./wrk -t1 -c1 -d60s 'http://localhost:8084/display?w=320&h=240&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'
    854x480
        ./wrk -t1 -c1 -d60s 'http://localhost:8084/display?w=854&h=480&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'
    1280x720
        ./wrk -t1 -c1 -d60s 'http://localhost:8084/display?w=1280&h=720&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'
    1920x1080
        ./wrk -t1 -c1 -d60s 'http://localhost:8084/display?w=1920&h=1080&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'
    3840x2160
        ./wrk -t1 -c1 -d60s 'http://localhost:8084/display?w=3840&h=2160&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'


With enabled cache:

    320x240
        ./wrk -t1 -c1 -d60s 'http://localhost:8085/display?w=320&h=240&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'
    854x480
        ./wrk -t1 -c1 -d60s 'http://localhost:8085/display?w=854&h=480&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'
    1280x720
        ./wrk -t1 -c1 -d60s 'http://localhost:8085/display?w=1280&h=720&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'
    1920x1080
        ./wrk -t1 -c1 -d60s 'http://localhost:8085/display?w=1920&h=1080&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'
    3840x2160
        ./wrk -t1 -c1 -d60s 'http://localhost:8085/display?w=3840&h=2160&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'
```

[willnorris/imageproxy](https://github.com/willnorris/imageproxy):
```
    320x240
        ./wrk -t1 -c1 -d60s http://localhost:8086/320x240/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg
    854x480
        ./wrk -t1 -c1 -d60s http://localhost:8086/854x480/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg
    1280x720
        ./wrk -t1 -c1 -d60s http://localhost:8086/1280x720/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg
    1920x1080
        ./wrk -t1 -c1 -d60s http://localhost:8086/1920x1080/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg
    3840x2160
        ./wrk -t1 -c1 -d60s http://localhost:8086/3840x2160/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg


With enabled cache:

    320x240
        ./wrk -t1 -c1 -d60s http://localhost:8087/320x240/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg
    854x480
        ./wrk -t1 -c1 -d60s http://localhost:8087/854x480/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg
    1280x720
        ./wrk -t1 -c1 -d60s http://localhost:8087/1280x720/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg
    1920x1080
        ./wrk -t1 -c1 -d60s http://localhost:8087/1920x1080/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg
    3840x2160
        ./wrk -t1 -c1 -d60s http://localhost:8087/3840x2160/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg
```

[weserv/images](https://github.com/weserv/images):
```
    320x240
        ./wrk -t1 -c1 -d60s 'http://localhost:8088/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=320&h=240&fit=cover'
    854x480
        ./wrk -t1 -c1 -d60s 'http://localhost:8088/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=854&h=480&fit=cover'
    1280x720
        ./wrk -t1 -c1 -d60s 'http://localhost:8088/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=1280&h=720&fit=cover'
    1920x1080
        ./wrk -t1 -c1 -d60s 'http://localhost:8088/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=1920&h=1080&fit=cover'
    3840x2160
        ./wrk -t1 -c1 -d60s 'http://localhost:8088/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=3840&h=2160&fit=cover'


With enabled cache:

    320x240
        ./wrk -t1 -c1 -d60s 'http://localhost:8089/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=320&h=240&fit=cover'
    854x480
        ./wrk -t1 -c1 -d60s 'http://localhost:8089/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=854&h=480&fit=cover'
    1280x720
        ./wrk -t1 -c1 -d60s 'http://localhost:8089/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=1280&h=720&fit=cover'
    1920x1080
        ./wrk -t1 -c1 -d60s 'http://localhost:8089/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=1920&h=1080&fit=cover'
    3840x2160
        ./wrk -t1 -c1 -d60s 'http://localhost:8089/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=3840&h=2160&fit=cover'
```
