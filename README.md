# Thumbnails benchmark (standalone server solution for resizing, converting and etc.)

HTTP benchmarking tool https://github.com/wg/wrk

Source image (5141x3434): https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg

More info about testing [RU]: https://habr.com/ru/post/578282/


## Test PC info - **DigitalOcean 1CPU/2GB (Premium Intel with NVMe SSD)**
```
root@ubuntu-s-1vcpu-2gb-70gb-intel-fra1-01:/# free -h
               total        used        free      shared  buff/cache   available
Mem:           1.9Gi       198Mi       1.3Gi       4.0Mi       399Mi       1.6Gi
Swap:             0B          0B          0B
```

```
root@ubuntu-s-1vcpu-2gb-70gb-intel-fra1-01:/# lscpu
Architecture:            x86_64
  CPU op-mode(s):        32-bit, 64-bit
  Address sizes:         40 bits physical, 48 bits virtual
  Byte Order:            Little Endian
CPU(s):                  1
  On-line CPU(s) list:   0
Vendor ID:               GenuineIntel
  Model name:            DO-Premium-Intel
    CPU family:          6
    Model:               85
    Thread(s) per core:  1
    Core(s) per socket:  1
    Socket(s):           1
    Stepping:            7
    BogoMIPS:            4988.27
    Flags:               fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 syscall nx pdpe1gb
                          rdtscp lm constant_tsc rep_good nopl xtopology cpuid tsc_known_freq pni pclmulqdq vmx ssse3 fma cx16 pcid sse4_1 ss
                         e4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fau
                         lt invpcid_single ssbd ibrs ibpb ibrs_enhanced tpr_shadow vnmi flexpriority ept vpid ept_ad fsgsbase bmi1 avx2 smep
                         bmi2 erms invpcid rdseed adx smap clflushopt clwb xsaveopt xsavec xgetbv1 arat pku ospke arch_capabilities
Virtualization features:
  Virtualization:        VT-x
  Hypervisor vendor:     KVM
  Virtualization type:   full
Caches (sum of all):
  L1d:                   32 KiB (1 instance)
  L1i:                   32 KiB (1 instance)
  L2:                    4 MiB (1 instance)
NUMA:
  NUMA node(s):          1
  NUMA node0 CPU(s):     0
Vulnerabilities:
  Gather data sampling:  Unknown: Dependent on hypervisor status
  Itlb multihit:         KVM: Mitigation: VMX disabled
  L1tf:                  Not affected
  Mds:                   Not affected
  Meltdown:              Not affected
  Mmio stale data:       Vulnerable: Clear CPU buffers attempted, no microcode; SMT Host state unknown
  Retbleed:              Mitigation; Enhanced IBRS
  Spec rstack overflow:  Not affected
  Spec store bypass:     Mitigation; Speculative Store Bypass disabled via prctl and seccomp
  Spectre v1:            Mitigation; usercopy/swapgs barriers and __user pointer sanitization
  Spectre v2:            Mitigation; Enhanced IBRS, IBPB conditional, RSB filling, PBRSB-eIBRS SW sequence
  Srbds:                 Not affected
  Tsx async abort:       Not affected
```


## Test results (latency 90% + rps)

|                                | 320x240            | 854x480            | 1280x720           | 1920x1080           | 3840x2160          |
| ------------------------------ | ------------------ | ------------------ | ------------------ | ------------------- | ------------------ |
| imgproxy/imgproxy              | 233.58ms, 4.91rps  | 245.40ms, 4.66rps  | 303.66ms, 3.98rps  | 326.57ms, 3.58rps   | 502.41ms, 2.30rps  |
| thumbor/thumbor                | 551.96ms, 2.06rps  | 572.13ms, 2.00rps  | 613.17ms, 1.86rps  | 831.02ms, 1.53rps   | 874.71ms, 1.21rps  |
| thumbor/thumbor (cache)        | 1.56ms, 815.73rps  | 1.61ms, 797.37rps  | 1.73ms, 745.84rps  | 1.99ms, 648.41rps   | 3.81ms, 343.25rps  |
| h2non/imaginary                | 348.17ms, 1.72rps  | 428.24ms, 1.45rps  | 604.46ms, 1.90rps  | 553.59ms, 2.08rps   | 885.33ms, 1.07rps  |
| thoas/picfit                   | 1250.0ms, 0.88rps  | 1400.0ms, 0.83rps  | 1420.0ms, 0.77rps  | 1650.0ms, 0.67rps   | 1850.0ms, 0.43rps  |
| thoas/picfit (cache)           | 1.06ms, 1249.82rps | 1.65ms, 917.67rps  | 3.88ms, 635.90rps  | 4.89ms, 398.98rps   | 10.00ms, 120.1rps  |
| willnorris/imageproxy          | 1320.0ms, 0.85rps  | 1350.0ms, 0.82rps  | 1440.0ms, 0.75rps  | 1740.0ms, 0.63rps   | 2250.0ms, 0.40rps  |
| willnorris/imageproxy (cache)  | 0.61ms, 2769.57rps | 0.67ms, 2468.00rp  | 0.94ms, 1537.28rps | 1.38ms, 996.43rps   | 3.74ms, 337.05rps  |
| weserv/images                  | 789.31ms, 1.28rps  | 652.32ms, 1.59rps  | 737.88ms, 1.21rps  | 878.87ms, 1.15rps   | 1080.0ms, 0.87rps  |
| weserv/images (cache)          | 0.25ms, 6562.50rps | 0.26ms, 6315.25rps | 0.27ms, 5964.42rps | 0.34ms, 4506.96rps  | 0.72ms, 946.39rps  |
| flyimg/flyimg                  | 578.62ms, 1.86rps  | 1170.0ms, 0.93rps  | 1630.0ms, 0.65rps  | 1807.0ms, 0.45rps   | 3400.0ms, 0.22rps  |
| flyimg/flyimg (cache)          | 18.81ms, 52.24rps  | 21.02ms, 47.60rps  | 22.17ms, 45.11rps  | 27.52ms, 36.29rps   | 34.57ms, 28.87rps  |
| aldor007/mort                  | 253.60ms, 3.93rps  | 283.46ms, 3.51rps  | 317.36ms, 3.15rps  | 453.88ms, 2.20rps   | 1070.0ms, 0.93rps  |
| aldor007/mort (cache)          | 1.51ms, 672.97rps  | 2.81ms, 624.45rps  | 10.99ms, 474.07rps | 6.96ms, 357.36rps   | 8.78ms, 114.04rps  |


![https://quickchart.io/sandbox/#%7B%22chart%22%3A%22%7B%5Cn%20%20%20%20%5C%22type%5C%22%3A%20%5C%22horizontalBar%5C%22%2C%5Cn%20%20%20%20%5C%22data%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22labels%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22imgproxy%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22thumbor%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22thumbor%20(cache)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22imaginary%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22picfit%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22picfit%20(cache)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22imageproxy%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22imageproxy%20(cache)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22weserv%2Fimages%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22weserv%2Fimages%20(cache)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22flyimg%2Fflyimg%20(cache)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22aldor007%2Fmort%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22aldor007%2Fmort%20(cache)%5C%22%5Cn%20%20%20%20%20%20%20%20%5D%2C%5Cn%20%20%20%20%20%20%20%20%5C%22datasets%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%22320x240%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(54%2C%20162%2C%20235%2C%200.5)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(54%2C%20162%2C%20235)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20292.73%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20723.61%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2011.64%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20347.44%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201910%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.69%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201910%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.01%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20260.7%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%202.54%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2018.81%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20253.6%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.51%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%22854x480%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(255%2C%2099%2C%20132%2C%200.5)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(255%2C%2099%2C%20132)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20374.74%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20732.16%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2010.24%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20390.94%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201990%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.91%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201950%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.35%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20316.66%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%203.05%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2021.02%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20283.46%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%202.81%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%221280x720%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgb(201%2C%20203%2C%20207)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(154%2C%20162%2C%20235)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20396.28%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20836.88%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%209.9%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20600.91%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%202120%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%203.69%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%202220%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.93%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20411.36%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%203.11%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2022.17%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20317.36%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2010.99%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%221920x1080%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgb(101%2C%20103%2C%20207)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(154%2C%20162%2C%20235)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20599.33%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20927.3%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2011.54%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20527.4%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%202550%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%205.18%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%202650%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%203.2%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20820.88%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2021%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2027.52%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20453.88%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%206.96%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%223840x2160%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgb(50%2C%20163%2C%20177)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(154%2C%20162%2C%20235)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201530.99%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201370.3%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2021.53%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201020.37%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%202750%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2018.42%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%202850%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2010.56%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201270%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2049.57%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2034.57%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201070%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%208.78%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%5C%22options%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22plugins%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22datalabels%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22anchor%5C%22%3A%20%5C%22end%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22align%5C%22%3A%20%5C%22end%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22color%5C%22%3A%20%5C%22%23000%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%5C%22responsive%5C%22%3A%20true%2C%5Cn%20%20%20%20%20%20%20%20%5C%22legend%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22position%5C%22%3A%20%5C%22top%5C%22%5Cn%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%5C%22title%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22display%5C%22%3A%20true%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22text%5C%22%3A%20%5C%22Latency%20in%20milliseconds%20(lower%20is%20better)%5C%22%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%7D%22%2C%22width%22%3A1600%2C%22height%22%3A1000%2C%22version%22%3A%222%22%2C%22backgroundColor%22%3A%22%23fff%22%7D](./chart-latency.png)


## Example of test runs

### [imgproxy/imgproxy](https://github.com/imgproxy/imgproxy):
- **320x240**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8080/insecure/rs:fill:320:240/el:true/g:ce:0:0/plain/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **854x480**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8080/insecure/rs:fill:854:480/el:true/g:ce:0:0/plain/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **1280x720**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8080/insecure/rs:fill:1280:720/el:true/g:ce:0:0/plain/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **1920x1080**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8080/insecure/rs:fill:1920:1080/el:true/g:ce:0:0/plain/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **3840x2160**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8080/insecure/rs:fill:3840:2160/el:true/g:ce:0:0/plain/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`

### [thumbor/thumbor](https://github.com/thumbor/thumbor):
- **320x240**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8081/unsafe/320x240/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'`
- **854x480**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8081/unsafe/854x480/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'`
- **1280x720**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8081/unsafe/1280x720/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'`
- **1920x1080**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8081/unsafe/1920x1080/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'`
- **3840x2160**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8081/unsafe/3840x2160/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'`

### [thumbor/thumbor (cache)](https://github.com/thumbor/thumbor):
- **320x240**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8082/unsafe/320x240/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'`
- **854x480**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8082/unsafe/854x480/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'`
- **1280x720**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8082/unsafe/1280x720/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'`
- **1920x1080**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8082/unsafe/1920x1080/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'`
- **3840x2160**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8082/unsafe/3840x2160/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'`

### [h2non/imaginary](https://github.com/h2non/imaginary):
- **320x240**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8083/enlarge?width=320&height=240&url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **854x480**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8083/enlarge?width=854&height=480&url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **1280x720**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8083/enlarge?width=1280&height=720&url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **1920x1080**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8083/enlarge?width=1920&height=1080&url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **3840x2160**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8083/enlarge?width=3840&height=2160&url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`

### [thoas/picfit](https://github.com/thoas/picfit):
- **320x240**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8084/display?w=320&h=240&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'`
- **854x480**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8084/display?w=854&h=480&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'`
- **1280x720**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8084/display?w=1280&h=720&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'`
- **1920x1080**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8084/display?w=1920&h=1080&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'`
- **3840x2160**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8084/display?w=3840&h=2160&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'`

### [thoas/picfit (cache)](https://github.com/thoas/picfit):
- **320x240**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8085/display?w=320&h=240&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'`
- **854x480**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8085/display?w=854&h=480&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'`
- **1280x720**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8085/display?w=1280&h=720&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'`
- **1920x1080**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8085/display?w=1920&h=1080&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'`
- **3840x2160**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8085/display?w=3840&h=2160&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg'`

### [willnorris/imageproxy](https://github.com/willnorris/imageproxy):
- **320x240**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8086/320x240/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **854x480**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8086/854x480/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **1280x720**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8086/1280x720/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **1920x1080**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8086/1920x1080/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **3840x2160**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8086/3840x2160/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`

### [willnorris/imageproxy (cache)](https://github.com/willnorris/imageproxy):
- **320x240**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8087/320x240/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **854x480**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8087/854x480/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **1280x720**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8087/1280x720/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **1920x1080**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8087/1920x1080/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **3840x2160**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8087/3840x2160/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`

### [weserv/images](https://github.com/weserv/images):
- **320x240**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8088/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=320&h=240&fit=cover'`
- **854x480**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8088/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=854&h=480&fit=cover'`
- **1280x720**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8088/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=1280&h=720&fit=cover'`
- **1920x1080**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8088/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=1920&h=1080&fit=cover'`
- **3840x2160**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8088/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=3840&h=2160&fit=cover'`

### [weserv/images (cache)](https://github.com/weserv/images):
- **320x240**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8089/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=320&h=240&fit=cover'`
- **854x480**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8089/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=854&h=480&fit=cover'`
- **1280x720**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8089/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=1280&h=720&fit=cover'`
- **1920x1080**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8089/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=1920&h=1080&fit=cover'`
- **3840x2160**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8089/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=3840&h=2160&fit=cover'`

### [flyimg/flyimg](https://github.com/flyimg/flyimg):
- **320x240**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8090/upload/w_320,h_240,c_1/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **854x480**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8090/upload/w_854,h_480,c_1/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **1280x720**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8090/upload/w_1280,h_720,c_1/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **1920x1080**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8090/upload/w_1920,h_1080,c_1/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **3840x2160**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8090/upload/w_3840,h_2160,c_1/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`

### [flyimg/flyimg (cache)](https://github.com/flyimg/flyimg):
- **320x240**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8091/upload/w_320,h_240,c_1/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **854x480**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8091/upload/w_854,h_480,c_1/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **1280x720**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8091/upload/w_1280,h_720,c_1/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **1920x1080**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8091/upload/w_1920,h_1080,c_1/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`
- **3840x2160**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8091/upload/w_3840,h_2160,c_1/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg'`

### [aldor007/mort](https://github.com/aldor007/mort):
- **320x240**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8092/query/pexels-magda-ehlers.jpg?operation=crop&gravity=center&width=320&height=240'`
- **854x480**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8092/query/pexels-magda-ehlers.jpg?operation=crop&gravity=center&width=854&height=480'`
- **1280x720**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8092/query/pexels-magda-ehlers.jpg?operation=crop&gravity=center&width=1280&height=720'`
- **1920x1080**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8092/query/pexels-magda-ehlers.jpg?operation=crop&gravity=center&width=1920&height=1080'`
- **3840x2160**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8092/query/pexels-magda-ehlers.jpg?operation=crop&gravity=center&width=3840&height=2160'`

### [aldor007/mort (cache)](https://github.com/aldor007/mort):
- **320x240**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8093/query/pexels-magda-ehlers.jpg?operation=crop&gravity=center&width=320&height=240'`
- **854x480**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8093/query/pexels-magda-ehlers.jpg?operation=crop&gravity=center&width=854&height=480'`
- **1280x720**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8093/query/pexels-magda-ehlers.jpg?operation=crop&gravity=center&width=1280&height=720'`
- **1920x1080**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8093/query/pexels-magda-ehlers.jpg?operation=crop&gravity=center&width=1920&height=1080'`
- **3840x2160**: `wrk -t1 -c1 -d60s --timeout 5s --latency 'http://localhost:8093/query/pexels-magda-ehlers.jpg?operation=crop&gravity=center&width=3840&height=2160'`


## PS. Helpers
```
docker compose up -d
docker compose down
docker compose ps
php run/run.php
php run/run.php "aldor007/mort" "aldor007/mort (cache)"
```
