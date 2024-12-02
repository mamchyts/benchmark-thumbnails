# Thumbnails benchmark (standalone server solution for resizing, converting and etc.)

HTTP benchmarking tool https://github.com/grafana/k6

Source image (5141x3434): https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg

More info about testing [RU]: https://habr.com/ru/post/578282/


## Test PC info - **DigitalOcean 1CPU/2GB (Premium Intel with NVMe SSD)**
```
root@ubuntu-s-1vcpu-2gb-70gb-intel-sfo3-01:~# free -h
               total        used        free      shared  buff/cache   available
Mem:           1.9Gi       311Mi       1.4Gi       4.0Mi       320Mi       1.6Gi
Swap:             0B          0B          0B
```

```
root@ubuntu-s-1vcpu-2gb-70gb-intel-sfo3-01:~# lscpu
Architecture:             x86_64
  CPU op-mode(s):         32-bit, 64-bit
  Address sizes:          40 bits physical, 48 bits virtual
  Byte Order:             Little Endian
CPU(s):                   1
  On-line CPU(s) list:    0
Vendor ID:                GenuineIntel
  BIOS Vendor ID:         QEMU
  Model name:             DO-Premium-Intel
    BIOS Model name:      pc-i440fx-6.1  CPU @ 2.0GHz
    BIOS CPU family:      1
    CPU family:           6
    Model:                85
    Thread(s) per core:   1
    Core(s) per socket:   1
    Socket(s):            1
    Stepping:             7
    BogoMIPS:             3999.99
    Flags:                fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush
                           mmx fxsr sse sse2 syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtop
                          ology cpuid tsc_known_freq pni pclmulqdq vmx ssse3 fma cx16 pcid sse4_1 sse4_2
                          x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lah
                          f_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb ibrs_enhanced tpr_shadow flex
                          priority ept vpid ept_ad fsgsbase bmi1 avx2 smep bmi2 erms invpcid rdseed adx s
                          map clflushopt clwb xsaveopt xsavec xgetbv1 arat vnmi pku ospke arch_capabiliti
                          es
Virtualization features:
  Virtualization:         VT-x
  Hypervisor vendor:      KVM
  Virtualization type:    full
Caches (sum of all):
  L1d:                    32 KiB (1 instance)
  L1i:                    32 KiB (1 instance)
  L2:                     4 MiB (1 instance)
NUMA:
  NUMA node(s):           1
  NUMA node0 CPU(s):      0
Vulnerabilities:
  Gather data sampling:   Unknown: Dependent on hypervisor status
  Itlb multihit:          KVM: Mitigation: VMX disabled
  L1tf:                   Not affected
  Mds:                    Not affected
  Meltdown:               Not affected
  Mmio stale data:        Vulnerable: Clear CPU buffers attempted, no microcode; SMT Host state unknown
  Reg file data sampling: Not affected
  Retbleed:               Mitigation; Enhanced IBRS
  Spec rstack overflow:   Not affected
  Spec store bypass:      Mitigation; Speculative Store Bypass disabled via prctl
  Spectre v1:             Mitigation; usercopy/swapgs barriers and __user pointer sanitization
  Spectre v2:             Mitigation; Enhanced / Automatic IBRS; IBPB conditional; RSB filling; PBRSB-eIB
                          RS SW sequence; BHI SW loop, KVM SW loop
  Srbds:                  Not affected
  Tsx async abort:        Not affected
```


## Test results: latency (95% percentile)

|                                                                           | 320x240  | 854x480  | 1280x720 | 1920x1080 | 3840x2160 |
| ------------------------------------------------------------------------- | -------- | -------- | -------- | --------- | --------- |
| [imgproxy/imgproxy](https://github.com/imgproxy/imgproxy)                 | 433.64ms | 379.25ms | 440.73ms | 567.97ms  | 1060s     |
| [thumbor/thumbor](https://github.com/thumbor/thumbor)                     | 851.45ms | 931.91ms | 1030ms   | 1030ms    | 1710ms    |
| [thumbor/thumbor (cache)](https://github.com/thumbor/thumbor)             | 6.99ms   | 8.58ms   | 9.43ms   | 10.49ms   | 38.05ms   |
| [h2non/imaginary](https://github.com/h2non/imaginary)                     | 642.61ms | 672.92ms | 656.05ms | 842.92ms  | 1210ms    |
| [thoas/picfit](https://github.com/thoas/picfit)                           | 2650ms   | 2890ms   | 2037ms   | 2950ms    | 2990ms    |
| [thoas/picfit (cache)](https://github.com/thoas/picfit)                   | 4.99ms   | 5.98ms   | 8.17ms   | 12.46ms   | 35.99ms   |
| [willnorris/imageproxy](https://github.com/willnorris/imageproxy)         | 2100ms   | 2220ms   | 2290ms   | 2660ms    | 5230ms    |
| [willnorris/imageproxy (cache)](https://github.com/willnorris/imageproxy) | 5.11ms   | 5.23ms   | 5.6ms    | 8.98ms    | 30.45ms   |
| [weserv/images](https://github.com/weserv/images)                         | 434.07ms | 422.99ms | 750.17ms | 718.39ms  | 1030ms    |
| [weserv/images (cache)](https://github.com/weserv/images)                 | 2.35ms   | 5.15ms   | 3.04ms   | 8.05ms    | 13.98ms   |
| [flyimg/flyimg](https://github.com/flyimg/flyimg)                         | 928.6ms  | 2310ms   | 2480ms   | 3870ms    | 7530ms    |
| [flyimg/flyimg (cache)](https://github.com/flyimg/flyimg)                 | 24.6ms   | 21.23ms  | 17.82ms  | 21.18ms   | 30.55ms   |
| [aldor007/mort](https://github.com/aldor007/mort)                         | 602.31ms | 695.02ms | 801.82ms | 1260ms    | 1120ms    |
| [aldor007/mort (cache)](https://github.com/aldor007/mort)                 | 6.6ms    | 4.91ms   | 5.61ms   | 6.99ms    | 12.79ms   |
| [cshum/imagor](https://github.com/cshum/imagor)                           | 494.75ms | 711.92ms | 1240ms   | 1500ms    | 6490ms    |
| [cshum/imagor (cache)](https://github.com/cshum/imagor)                   | 3.24ms   | 2.95ms   | 6.09ms   | 4.27ms    | 9.47ms    |

![https://quickchart.io/sandbox/#%7B%22chart%22%3A%22%7B%5Cn%20%20%20%20%5C%22type%5C%22%3A%20%5C%22bar%5C%22%2C%5Cn%20%20%20%20%5C%22data%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22labels%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22imgproxy%2Fimgproxy%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22thumbor%2Fthumbor%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22h2non%2Fimaginary%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22thoas%2Fpicfit%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22willnorris%2Fimageproxy%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22weserv%2Fimages%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22flyimg%2Fflyimg%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22aldor007%2Fmort%5C%22%5Cn%20%20%20%20%20%20%20%20%5D%2C%5Cn%20%20%20%20%20%20%20%20%5C%22datasets%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%22320x240%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(255%2C%2099%2C%20132%2C%200.8)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(255%2C%2099%2C%20132)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20233.58%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20551.96%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20348.17%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201250.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201320.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20789.31%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20578.62%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20311.44%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%22854x480%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(255%2C%20159%2C%2064%2C%200.8)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(255%2C%20159%2C%2064)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20245.40%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20572.13%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20428.24%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201400.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201350.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20652.32%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201170.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20351.44%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%221280x720%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(155%2C%20212%2C%20192%2C%200.8)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(155%2C%20212%2C%20192)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20303.66%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20613.17%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20604.46%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201420.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201440.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20737.88%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201710.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20606.40%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%221920x1080%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(74%2C%20182%2C%20245%2C%200.8)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(54%2C%20162%2C%20235)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20326.57%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20831.02%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20553.59%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201650.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201740.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20878.87%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%202490.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20435.67%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%223840x2160%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(123%2C%2082%2C%20235%2C%200.8)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(153%2C%20102%2C%20255)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20502.41%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20874.71%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20885.33%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201850.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%202250.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201080.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%204360.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20825.54%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%5C%22options%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22indexAxis%5C%22%3A%20%5C%22y%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%5C%22plugins%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22title%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22display%5C%22%3A%20true%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22text%5C%22%3A%20%5C%22CACHE%20OFF%20-%20Latency%20in%20milliseconds%20(lower%20is%20better)%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22datalabels%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22anchor%5C%22%3A%20%5C%22end%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22align%5C%22%3A%20%5C%22end%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22color%5C%22%3A%20%5C%22%23000%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22font%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22size%5C%22%3A%207%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%7D%22%2C%22width%22%3A1000%2C%22height%22%3A600%2C%22version%22%3A%224%22%2C%22backgroundColor%22%3A%22%23fff%22%7D](./chart-cache-off.webp)

![https://quickchart.io/sandbox/#%7B%22chart%22%3A%22%7B%5Cn%20%20%20%20%5C%22type%5C%22%3A%20%5C%22bar%5C%22%2C%5Cn%20%20%20%20%5C%22data%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22labels%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22thumbor%2Fthumbor%20(cache)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22thoas%2Fpicfit%20(cache)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22willnorris%2Fimageproxy%20(cache)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22weserv%2Fimages%20(cache)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22flyimg%2Fflyimg%20(cache)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22aldor007%2Fmort%20(cache)%5C%22%5Cn%20%20%20%20%20%20%20%20%5D%2C%5Cn%20%20%20%20%20%20%20%20%5C%22datasets%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%22320x240%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(255%2C%2099%2C%20132%2C%200.8)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(255%2C%2099%2C%20132)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.56%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.06%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%200.61%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%200.25%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%205.97%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%200.88%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%22854x480%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(255%2C%20159%2C%2064%2C%200.8)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(255%2C%20159%2C%2064)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.61%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.65%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%200.67%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%200.26%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%207.40%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%200.89%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%221280x720%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(155%2C%20212%2C%20192%2C%200.8)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(155%2C%20212%2C%20192)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.73%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%203.88%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%200.94%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%200.27%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%207.77%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.17%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%221920x1080%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(74%2C%20182%2C%20245%2C%200.8)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(54%2C%20162%2C%20235)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.99%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%204.89%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.38%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%200.34%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%209.26%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%223840x2160%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(123%2C%2082%2C%20235%2C%200.8)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(153%2C%20102%2C%20255)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%203.81%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2010.00%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%203.74%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%200.72%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2017.14%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%202.35%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%5C%22options%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22indexAxis%5C%22%3A%20%5C%22y%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%5C%22plugins%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22title%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22display%5C%22%3A%20true%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22text%5C%22%3A%20%5C%22CACHE%20ON%20-%20Latency%20in%20milliseconds%20(lower%20is%20better)%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22datalabels%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22anchor%5C%22%3A%20%5C%22end%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22align%5C%22%3A%20%5C%22end%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22color%5C%22%3A%20%5C%22%23000%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22font%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22size%5C%22%3A%207%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%7D%22%2C%22width%22%3A1000%2C%22height%22%3A600%2C%22version%22%3A%224%22%2C%22backgroundColor%22%3A%22%23fff%22%7D](./chart-cache-on.webp)


## Example of test run results
```
data_received........................: 757 MB 135 kB/s
data_sent............................: 783 kB 140 B/s
dropped_iterations...................: 937    0.167621/s
http_req_blocked.....................: avg=280.67µs min=0s       med=8.83µs   max=1.01s    p(90)=11.43µs  p(95)=18.45µs
http_req_connecting..................: avg=269.49µs min=0s       med=0s       max=1.01s    p(90)=0s       p(95)=0s
http_req_duration....................: avg=467.65ms min=0s       med=15.22ms  max=59.99s   p(90)=1.23s    p(95)=1.82s
  { expected_response:true }.........: avg=442.21ms min=1.1ms    med=17.45ms  max=10.34s   p(90)=1.31s    p(95)=1.85s
http_req_failed......................: 5.12%  202 out of 3941
http_req_receiving...................: avg=1.91ms   min=0s       med=993.64µs max=52.99ms  p(90)=4.23ms   p(95)=6.76ms
http_req_sending.....................: avg=30.1µs   min=0s       med=25.25µs  max=471.34µs p(90)=38.5µs   p(95)=49.92µs
http_req_tls_handshaking.............: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
http_req_waiting.....................: avg=465.7ms  min=0s       med=11.3ms   max=59.99s   p(90)=1.23s    p(95)=1.82s
http_reqs............................: 3941   0.705008/s
iteration_duration...................: avg=468.2ms  min=1.28ms   med=15.51ms  max=1m0s     p(90)=1.23s    p(95)=1.82s
iterations...........................: 3941   0.705008/s
latency_flyimg_1280x720..............: avg=1.9s     min=1.49s    med=1.78s    max=2.59s    p(90)=2.42s    p(95)=2.48s
latency_flyimg_1920x1080.............: avg=3.11s    min=2.4s     med=3.05s    max=4.19s    p(90)=3.78s    p(95)=3.87s
latency_flyimg_320x240...............: avg=708.62ms min=539.12ms med=672.73ms max=1.28s    p(90)=916.56ms p(95)=928.6ms
latency_flyimg_3840x2160.............: avg=6.28s    min=4.94s    med=6.26s    max=7.66s    p(90)=7.39s    p(95)=7.53s
latency_flyimg_854x480...............: avg=1.43s    min=987.78ms med=1.26s    max=3.4s     p(90)=1.72s    p(95)=2.31s
latency_flyimg_cache_1280x720........: avg=41.4ms   min=7.73ms   med=11.56ms  max=1.76s    p(90)=16.43ms  p(95)=17.82ms
latency_flyimg_cache_1920x1080.......: avg=57.38ms  min=8.72ms   med=11.05ms  max=2.66s    p(90)=17.81ms  p(95)=21.18ms
latency_flyimg_cache_320x240.........: avg=27.49ms  min=7.49ms   med=11.47ms  max=933.57ms p(90)=17.8ms   p(95)=24.6ms
latency_flyimg_cache_3840x2160.......: avg=141.92ms min=11.08ms  med=14.68ms  max=6.9s     p(90)=25.28ms  p(95)=30.55ms
latency_flyimg_cache_854x480.........: avg=34.53ms  min=7.98ms   med=10.72ms  max=1.36s    p(90)=16.55ms  p(95)=21.23ms
latency_imageproxy_1280x720..........: avg=1.76s    min=1.4s     med=1.65s    max=2.37s    p(90)=2.28s    p(95)=2.29s
latency_imageproxy_1920x1080.........: avg=2s       min=1.62s    med=1.85s    max=2.68s    p(90)=2.59s    p(95)=2.66s
latency_imageproxy_320x240...........: avg=1.69s    min=1.22s    med=1.7s     max=2.67s    p(90)=2.01s    p(95)=2.1s
latency_imageproxy_3840x2160.........: avg=3.74s    min=2.72s    med=3.32s    max=6.75s    p(90)=4.51s    p(95)=5.23s
latency_imageproxy_854x480...........: avg=1.65s    min=1.35s    med=1.51s    max=2.29s    p(90)=2.12s    p(95)=2.22s
latency_imageproxy_cache_1280x720....: avg=28.17ms  min=1.83ms   med=2.99ms   max=1.49s    p(90)=5.28ms   p(95)=5.6ms
latency_imageproxy_cache_1920x1080...: avg=33.13ms  min=2.32ms   med=4.81ms   max=1.68s    p(90)=7.47ms   p(95)=8.98ms
latency_imageproxy_cache_320x240.....: avg=41.33ms  min=1.39ms   med=1.91ms   max=2.31s    p(90)=3.02ms   p(95)=5.11ms
latency_imageproxy_cache_3840x2160...: avg=84.29ms  min=2.82ms   med=14.25ms  max=3.9s     p(90)=23.53ms  p(95)=30.45ms
latency_imageproxy_cache_854x480.....: avg=35.67ms  min=1.55ms   med=2.33ms   max=1.98s    p(90)=3.71ms   p(95)=5.23ms
latency_imaginary_1280x720...........: avg=596.02ms min=371.11ms med=487.96ms max=5.64s    p(90)=631.61ms p(95)=656.05ms
latency_imaginary_1920x1080..........: avg=492.86ms min=336.58ms med=434.32ms max=1.2s     p(90)=682.08ms p(95)=842.92ms
latency_imaginary_320x240............: avg=511.22ms min=249.6ms  med=371.09ms max=3.56s    p(90)=528.62ms p(95)=642.61ms
latency_imaginary_3840x2160..........: avg=911.51ms min=683.43ms med=858.74ms max=1.55s    p(90)=1.12s    p(95)=1.21s
latency_imaginary_854x480............: avg=592.86ms min=436.58ms med=534.32ms max=1.5s     p(90)=582.08ms p(95)=672.92ms
latency_imagor_1280x720..............: avg=645.28ms min=427.21ms med=611.82ms max=1.55s    p(90)=796.22ms p(95)=1.24s
latency_imagor_1920x1080.............: avg=1.14s    min=869.83ms med=1.09s    max=1.64s    p(90)=1.44s    p(95)=1.5s
latency_imagor_320x240...............: avg=383.19ms min=277.33ms med=375.41ms max=596.29ms p(90)=483.09ms p(95)=494.75ms
latency_imagor_3840x2160.............: avg=2.75s    min=1.56s    med=1.98s    max=10.34s   p(90)=4.87s    p(95)=6.49s
latency_imagor_854x480...............: avg=537.06ms min=420.57ms med=503.58ms max=792.97ms p(90)=668.36ms p(95)=711.92ms
latency_imagor_cache_1280x720........: avg=12.19ms  min=1.88ms   med=2.77ms   max=561.72ms p(90)=4.2ms    p(95)=6.09ms
latency_imagor_cache_1920x1080.......: avg=21.27ms  min=1.98ms   med=2.92ms   max=1.09s    p(90)=4.13ms   p(95)=4.27ms
latency_imagor_cache_320x240.........: avg=12.17ms  min=1.3ms    med=1.67ms   max=629.34ms p(90)=2.64ms   p(95)=3.24ms
latency_imagor_cache_3840x2160.......: avg=43.59ms  min=2.76ms   med=4.88ms   max=2.26s    p(90)=7.16ms   p(95)=9.47ms
latency_imagor_cache_854x480.........: avg=12.81ms  min=1.47ms   med=2.13ms   max=650.72ms p(90)=2.81ms   p(95)=2.95ms
latency_imgproxy_1280x720............: avg=311.52ms min=238.9ms  med=299.38ms max=494.35ms p(90)=418.54ms p(95)=440.73ms
latency_imgproxy_1920x1080...........: avg=394.47ms min=291.43ms med=372.14ms max=635.08ms p(90)=508.66ms p(95)=567.97ms
latency_imgproxy_320x240.............: avg=303.91ms min=219.27ms med=293.39ms max=741.17ms p(90)=395.62ms p(95)=433.64ms
latency_imgproxy_3840x2160...........: avg=689.1ms  min=468.26ms med=645.15ms max=1.47s    p(90)=871.29ms p(95)=1.06s
latency_imgproxy_854x480.............: avg=303.08ms min=233.17ms med=303.93ms max=414.23ms p(90)=366.42ms p(95)=379.25ms
latency_mort_1280x720................: avg=517.95ms min=388.49ms med=492.15ms max=726.06ms p(90)=654.83ms p(95)=695.02ms
latency_mort_1920x1080...............: avg=570.69ms min=384.94ms med=506.27ms max=1.49s    p(90)=731.79ms p(95)=1.26s
latency_mort_320x240.................: avg=686.75ms min=248.88ms med=313.42ms max=17.26s   p(90)=479.42ms p(95)=602.31ms
latency_mort_3840x2160...............: avg=872.26ms min=732.7ms  med=816.89ms max=1.28s    p(90)=1.07s    p(95)=1.12s
latency_mort_854x480.................: avg=432.21ms min=290.56ms med=376.72ms max=1.1s     p(90)=670.4ms  p(95)=801.82ms
latency_mort_cache_1280x720..........: avg=13.72ms  min=1.96ms   med=2.63ms   max=656.33ms p(90)=4.38ms   p(95)=5.61ms
latency_mort_cache_1920x1080.........: avg=10.53ms  min=1.85ms   med=3.12ms   max=422.15ms p(90)=5.54ms   p(95)=6.99ms
latency_mort_cache_320x240...........: avg=11.31ms  min=1.51ms   med=2.07ms   max=534.68ms p(90)=3.99ms   p(95)=6.6ms
latency_mort_cache_3840x2160.........: avg=26.46ms  min=2.81ms   med=4.62ms   max=1.26s    p(90)=9.4ms    p(95)=12.79ms
latency_mort_cache_854x480...........: avg=9.2ms    min=1.67ms   med=2.49ms   max=385.83ms p(90)=4.66ms   p(95)=4.91ms
latency_picfit_1280x720..............: avg=1.82s    min=1.4s     med=1.76s    max=2.78s    p(90)=2.19s    p(95)=2.37s
latency_picfit_1920x1080.............: avg=2.08s    min=1.57s    med=1.99s    max=3.03s    p(90)=2.57s    p(95)=2.95s
latency_picfit_320x240...............: avg=1.89s    min=1.37s    med=1.79s    max=3.33s    p(90)=2.51s    p(95)=2.65s
latency_picfit_3840x2160.............: avg=2.64s    min=2.23s    med=2.59s    max=3.4s     p(90)=2.91s    p(95)=2.99s
latency_picfit_854x480...............: avg=1.94s    min=1.28s    med=1.62s    max=5.53s    p(90)=2.59s    p(95)=2.89s
latency_picfit_cache_1280x720........: avg=29.09ms  min=2.43ms   med=3.93ms   max=1.48s    p(90)=7.33ms   p(95)=8.17ms
latency_picfit_cache_1920x1080.......: avg=33.91ms  min=3.06ms   med=5.55ms   max=1.67s    p(90)=10.18ms  p(95)=12.46ms
latency_picfit_cache_320x240.........: avg=38.29ms  min=1.61ms   med=2.21ms   max=2.1s     p(90)=3.69ms   p(95)=4.99ms
latency_picfit_cache_3840x2160.......: avg=65.31ms  min=9.35ms   med=14.63ms  max=2.89s    p(90)=26.37ms  p(95)=35.99ms
latency_picfit_cache_854x480.........: avg=26.56ms  min=1.96ms   med=3.1ms    max=1.37s    p(90)=5.15ms   p(95)=5.98ms
latency_thumbor_1280x720.............: avg=778.72ms min=575.09ms med=697.27ms max=1.9s     p(90)=939.98ms p(95)=1.03s
latency_thumbor_1920x1080............: avg=819.31ms min=620.51ms med=818.75ms max=1.19s    p(90)=996.98ms p(95)=1.03s
latency_thumbor_320x240..............: avg=675.79ms min=530.89ms med=659.86ms max=1.01s    p(90)=820.95ms p(95)=851.45ms
latency_thumbor_3840x2160............: avg=1.12s    min=869.68ms med=1.01s    max=1.89s    p(90)=1.5s     p(95)=1.71s
latency_thumbor_854x480..............: avg=704.26ms min=526.17ms med=698.05ms max=1.06s    p(90)=872.37ms p(95)=931.91ms
latency_thumbor_cache_1280x720.......: avg=20.37ms  min=3.37ms   med=4.83ms   max=917.75ms p(90)=8.95ms   p(95)=9.43ms
latency_thumbor_cache_1920x1080......: avg=22.36ms  min=3.83ms   med=5.43ms   max=1s       p(90)=7.38ms   p(95)=10.49ms
latency_thumbor_cache_320x240........: avg=16.74ms  min=2.61ms   med=3.37ms   max=779.24ms p(90)=4.8ms    p(95)=6.99ms
latency_thumbor_cache_3840x2160......: avg=28.86ms  min=15.36ms  med=20.57ms  max=263.52ms p(90)=32.79ms  p(95)=38.05ms
latency_thumbor_cache_854x480........: avg=22.47ms  min=2.84ms   med=4.05ms   max=1.07s    p(90)=7.5ms    p(95)=8.58ms
latency_weserv_1280x720..............: avg=358.84ms min=1.28ms   med=373.44ms max=993.4ms  p(90)=554.13ms p(95)=750.17ms
latency_weserv_1920x1080.............: avg=421.06ms min=1.12ms   med=497.85ms max=1.05s    p(90)=663.78ms p(95)=718.39ms
latency_weserv_320x240...............: avg=255.8ms  min=1.14ms   med=278.23ms max=572.13ms p(90)=389.21ms p(95)=434.07ms
latency_weserv_3840x2160.............: avg=617.65ms min=1.08ms   med=768.62ms max=1.21s    p(90)=993.02ms p(95)=1.03s
latency_weserv_854x480...............: avg=246.91ms min=1.19ms   med=309.28ms max=443.16ms p(90)=409.34ms p(95)=422.99ms
latency_weserv_cache_1280x720........: avg=9.09ms   min=1.14ms   med=1.51ms   max=447.51ms p(90)=2.52ms   p(95)=3.04ms
latency_weserv_cache_1920x1080.......: avg=23.05ms  min=1.73ms   med=2.75ms   max=673.95ms p(90)=6.39ms   p(95)=8.05ms
latency_weserv_cache_320x240.........: avg=13.42ms  min=1.1ms    med=1.41ms   max=380.59ms p(90)=1.83ms   p(95)=2.35ms
latency_weserv_cache_3840x2160.......: avg=39.84ms  min=2.34ms   med=3.77ms   max=1.13s    p(90)=11.01ms  p(95)=13.98ms
latency_weserv_cache_854x480.........: avg=14.83ms  min=1.26ms   med=2.04ms   max=389.41ms p(90)=3.31ms   p(95)=5.15ms
vus..................................: 0      min=0           max=1
vus_max..............................: 1      min=1           max=1
```


## Test excecution
```
docker run --rm --env HOST=http://10.124.0.2 -i grafana/k6 run - <run/k6.js
```


## PS. Helpers
```
$ make help

git.checkout-pull                Git checkout to master and pull
up                               Run project
down                             Shutdown project
build                            Build docker images
update                           Update project
test-localhost                   Run testing on localhost
```
