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

|                                                                           | 320x240  | 854x480  | 1280x720  | 1920x1080  | 3840x2160  |
| ------------------------------------------------------------------------- | -------- | -------- | --------- | ---------- | ---------- |
| [imgproxy/imgproxy](https://github.com/imgproxy/imgproxy)                 | 0.0ms    | 0.0ms    | 0.0ms     | 0.0ms      | 0.0ms      |
| [thumbor/thumbor](https://github.com/thumbor/thumbor)                     | 0.0ms    | 0.0ms    | 0.0ms     | 0.0ms      | 0.0ms      |
| [thumbor/thumbor (cache)](https://github.com/thumbor/thumbor)             | 0.0ms    | 0.0ms    | 0.0ms     | 0.0ms      | 0.0ms      |
| [h2non/imaginary](https://github.com/h2non/imaginary)                     | 0.0ms    | 0.0ms    | 0.0ms     | 0.0ms      | 0.0ms      |
| [thoas/picfit](https://github.com/thoas/picfit)                           | 0.0ms    | 0.0ms    | 0.0ms     | 0.0ms      | 0.0ms      |
| [thoas/picfit (cache)](https://github.com/thoas/picfit)                   | 0.0ms    | 0.0ms    | 0.0ms     | 0.0ms      | 0.0ms      |
| [willnorris/imageproxy](https://github.com/willnorris/imageproxy)         | 0.0ms    | 0.0ms    | 0.0ms     | 0.0ms      | 0.0ms      |
| [willnorris/imageproxy (cache)](https://github.com/willnorris/imageproxy) | 0.0ms    | 0.0ms    | 0.0ms     | 0.0ms      | 0.0ms      |
| [weserv/images](https://github.com/weserv/images)                         | 0.0ms    | 0.0ms    | 0.0ms     | 0.0ms      | 0.0ms      |
| [weserv/images (cache)](https://github.com/weserv/images)                 | 0.0ms    | 0.0ms    | 0.0ms     | 0.0ms      | 0.0ms      |
| [flyimg/flyimg](https://github.com/flyimg/flyimg)                         | 0.0ms    | 0.0ms    | 0.0ms     | 0.0ms      | 0.0ms      |
| [flyimg/flyimg (cache)](https://github.com/flyimg/flyimg)                 | 0.0ms    | 0.0ms    | 0.0ms     | 0.0ms      | 0.0ms      |
| [aldor007/mort](https://github.com/aldor007/mort)                         | 0.0ms    | 0.0ms    | 0.0ms     | 0.0ms      | 0.0ms      |
| [aldor007/mort (cache)](https://github.com/aldor007/mort)                 | 0.0ms    | 0.0ms    | 0.0ms     | 0.0ms      | 0.0ms      |
| [cshum/imagor](https://github.com/cshum/imagor)                           | 0.0ms    | 0.0ms    | 0.0ms     | 0.0ms      | 0.0ms      |
| [cshum/imagor (cache)](https://github.com/cshum/imagor)                   | 0.0ms    | 0.0ms    | 0.0ms     | 0.0ms      | 0.0ms      |

![https://quickchart.io/sandbox/#%7B%22chart%22%3A%22%7B%5Cn%20%20%20%20%5C%22type%5C%22%3A%20%5C%22bar%5C%22%2C%5Cn%20%20%20%20%5C%22data%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22labels%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22imgproxy%2Fimgproxy%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22thumbor%2Fthumbor%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22h2non%2Fimaginary%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22thoas%2Fpicfit%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22willnorris%2Fimageproxy%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22weserv%2Fimages%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22flyimg%2Fflyimg%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22aldor007%2Fmort%5C%22%5Cn%20%20%20%20%20%20%20%20%5D%2C%5Cn%20%20%20%20%20%20%20%20%5C%22datasets%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%22320x240%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(255%2C%2099%2C%20132%2C%200.8)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(255%2C%2099%2C%20132)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20233.58%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20551.96%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20348.17%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201250.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201320.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20789.31%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20578.62%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20311.44%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%22854x480%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(255%2C%20159%2C%2064%2C%200.8)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(255%2C%20159%2C%2064)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20245.40%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20572.13%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20428.24%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201400.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201350.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20652.32%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201170.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20351.44%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%221280x720%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(155%2C%20212%2C%20192%2C%200.8)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(155%2C%20212%2C%20192)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20303.66%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20613.17%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20604.46%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201420.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201440.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20737.88%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201710.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20606.40%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%221920x1080%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(74%2C%20182%2C%20245%2C%200.8)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(54%2C%20162%2C%20235)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20326.57%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20831.02%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20553.59%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201650.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201740.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20878.87%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%202490.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20435.67%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%223840x2160%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(123%2C%2082%2C%20235%2C%200.8)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(153%2C%20102%2C%20255)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20502.41%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20874.71%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20885.33%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201850.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%202250.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201080.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%204360.0%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20825.54%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%5C%22options%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22indexAxis%5C%22%3A%20%5C%22y%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%5C%22plugins%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22title%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22display%5C%22%3A%20true%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22text%5C%22%3A%20%5C%22CACHE%20OFF%20-%20Latency%20in%20milliseconds%20(lower%20is%20better)%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22datalabels%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22anchor%5C%22%3A%20%5C%22end%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22align%5C%22%3A%20%5C%22end%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22color%5C%22%3A%20%5C%22%23000%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22font%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22size%5C%22%3A%207%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%7D%22%2C%22width%22%3A1000%2C%22height%22%3A600%2C%22version%22%3A%224%22%2C%22backgroundColor%22%3A%22%23fff%22%7D](./chart-cache-off.webp)

![https://quickchart.io/sandbox/#%7B%22chart%22%3A%22%7B%5Cn%20%20%20%20%5C%22type%5C%22%3A%20%5C%22bar%5C%22%2C%5Cn%20%20%20%20%5C%22data%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22labels%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22thumbor%2Fthumbor%20(cache)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22thoas%2Fpicfit%20(cache)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22willnorris%2Fimageproxy%20(cache)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22weserv%2Fimages%20(cache)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22flyimg%2Fflyimg%20(cache)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22aldor007%2Fmort%20(cache)%5C%22%5Cn%20%20%20%20%20%20%20%20%5D%2C%5Cn%20%20%20%20%20%20%20%20%5C%22datasets%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%22320x240%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(255%2C%2099%2C%20132%2C%200.8)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(255%2C%2099%2C%20132)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.56%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.06%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%200.61%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%200.25%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%205.97%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%200.88%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%22854x480%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(255%2C%20159%2C%2064%2C%200.8)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(255%2C%20159%2C%2064)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.61%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.65%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%200.67%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%200.26%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%207.40%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%200.89%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%221280x720%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(155%2C%20212%2C%20192%2C%200.8)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(155%2C%20212%2C%20192)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.73%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%203.88%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%200.94%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%200.27%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%207.77%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.17%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%221920x1080%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(74%2C%20182%2C%20245%2C%200.8)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(54%2C%20162%2C%20235)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.99%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%204.89%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.38%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%200.34%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%209.26%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201.29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22label%5C%22%3A%20%5C%223840x2160%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22backgroundColor%5C%22%3A%20%5C%22rgba(123%2C%2082%2C%20235%2C%200.8)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderColor%5C%22%3A%20%5C%22rgb(153%2C%20102%2C%20255)%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22borderWidth%5C%22%3A%201%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22data%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%203.81%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2010.00%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%203.74%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%200.72%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2017.14%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%202.35%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%5C%22options%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22indexAxis%5C%22%3A%20%5C%22y%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%5C%22plugins%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22title%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22display%5C%22%3A%20true%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22text%5C%22%3A%20%5C%22CACHE%20ON%20-%20Latency%20in%20milliseconds%20(lower%20is%20better)%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22datalabels%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22anchor%5C%22%3A%20%5C%22end%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22align%5C%22%3A%20%5C%22end%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22color%5C%22%3A%20%5C%22%23000%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22font%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%22size%5C%22%3A%207%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%7D%22%2C%22width%22%3A1000%2C%22height%22%3A600%2C%22version%22%3A%224%22%2C%22backgroundColor%22%3A%22%23fff%22%7D](./chart-cache-on.webp)


## Example of test run results
```
data_received........................: 910 MB 163 kB/s
data_sent............................: 937 kB 168 B/s
dropped_iterations...................: 337    0.060286/s
http_req_blocked.....................: avg=10.44µs  min=3.06µs   med=7.81µs   max=684.27µs p(90)=10.21µs  p(95)=11.58µs
http_req_connecting..................: avg=1.32µs   min=0s       med=0s       max=493.52µs p(90)=0s       p(95)=0s
http_req_duration....................: avg=368.05ms min=525.72µs med=291.3ms  max=2.48s    p(90)=913.72ms p(95)=1.11s
  { expected_response:true }.........: avg=376.84ms min=572.38µs med=308.79ms max=2.48s    p(90)=917.72ms p(95)=1.12s
http_req_failed......................: 2.79%  126 out of 4516
http_req_receiving...................: avg=433.69µs min=32.82µs  med=177.35µs max=14.35ms  p(90)=826.72µs p(95)=1.76ms
http_req_sending.....................: avg=29.88µs  min=10.57µs  med=27.69µs  max=457.99µs p(90)=36.48µs  p(95)=42.92µs
http_req_tls_handshaking.............: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
http_req_waiting.....................: avg=367.59ms min=435.27µs med=291.16ms max=2.48s    p(90)=912.8ms  p(95)=1.11s
http_reqs............................: 4516   0.807871/s
iteration_duration...................: avg=368.28ms min=681.72µs med=291.52ms max=2.48s    p(90)=913.95ms p(95)=1.11s
iterations...........................: 4516   0.807871/s
latency_flyimg_1280x720..............: avg=911.37ms min=882.62ms med=910.58ms max=930.98ms p(90)=921.16ms p(95)=926.27ms
latency_flyimg_1920x1080.............: avg=1.28s    min=1.26s    med=1.28s    max=1.33s    p(90)=1.3s     p(95)=1.3s
latency_flyimg_320x240...............: avg=407.74ms min=386.32ms med=398.7ms  max=934.55ms p(90)=408.41ms p(95)=412.24ms
latency_flyimg_3840x2160.............: avg=2.47s    min=2.45s    med=2.47s    max=2.48s    p(90)=2.48s    p(95)=2.48s
latency_flyimg_854x480...............: avg=684.44ms min=650.59ms med=684.4ms  max=707.76ms p(90)=694.29ms p(95)=697.76ms
latency_flyimg_cache_1280x720........: avg=26.14ms  min=9.01ms   med=9.65ms   max=920.13ms p(90)=14.02ms  p(95)=15.97ms
latency_flyimg_cache_1920x1080.......: avg=32.58ms  min=9.41ms   med=10.11ms  max=1.29s    p(90)=13.43ms  p(95)=13.72ms
latency_flyimg_cache_320x240.........: avg=28.7ms   min=8.7ms    med=9.11ms   max=1.09s    p(90)=12.23ms  p(95)=12.92ms
latency_flyimg_cache_3840x2160.......: avg=56.39ms  min=9.29ms   med=14.03ms  max=2.48s    p(90)=17.15ms  p(95)=17.6ms
latency_flyimg_cache_854x480.........: avg=21.67ms  min=9.03ms   med=9.34ms   max=696ms    p(90)=12.24ms  p(95)=12.45ms
latency_imageproxy_1280x720..........: avg=730.92ms min=613.45ms med=700.32ms max=1.79s    p(90)=777.18ms p(95)=839.34ms
latency_imageproxy_1920x1080.........: avg=783.57ms min=697.8ms  med=768.5ms  max=1.06s    p(90)=857.79ms p(95)=915.22ms
latency_imageproxy_320x240...........: avg=643.95ms min=544.89ms med=620.63ms max=900.14ms p(90)=732.9ms  p(95)=746.79ms
latency_imageproxy_3840x2160.........: avg=1.16s    min=1.06s    med=1.14s    max=1.36s    p(90)=1.25s    p(95)=1.3s
latency_imageproxy_854x480...........: avg=610.42ms min=555.29ms med=602.76ms max=781.45ms p(90)=634.44ms p(95)=661.43ms
latency_imageproxy_cache_1280x720....: avg=8.53ms   min=1.03ms   med=1.13ms   max=444.98ms p(90)=1.19ms   p(95)=1.22ms
latency_imageproxy_cache_1920x1080...: avg=9.88ms   min=1.26ms   med=1.38ms   max=519.18ms p(90)=1.51ms   p(95)=1.51ms
latency_imageproxy_cache_320x240.....: avg=33.98ms  min=29.16ms  med=30.94ms  max=95.86ms  p(90)=37.21ms  p(95)=45.63ms
latency_imageproxy_cache_3840x2160...: avg=16.71ms  min=2.36ms   med=2.89ms   max=842.88ms p(90)=3.51ms   p(95)=3.56ms
latency_imageproxy_cache_854x480.....: avg=10.77ms  min=572.38µs med=1.02ms   max=595.77ms p(90)=1.1ms    p(95)=1.13ms
latency_imaginary_1280x720...........: avg=1.15s    min=818.42ms med=1.12s    max=1.67s    p(90)=1.5s     p(95)=1.64s
latency_imaginary_1920x1080..........: avg=963.06ms min=548.95ms med=939.11ms max=1.43s    p(90)=1.31s    p(95)=1.33s
latency_imaginary_320x240............: avg=852.72ms min=310.31ms med=853.18ms max=1.99s    p(90)=1.27s    p(95)=1.29s
latency_imaginary_3840x2160..........: avg=1.07s    min=798.83ms med=1.04s    max=1.52s    p(90)=1.35s    p(95)=1.39s
latency_imaginary_854x480............: avg=1.04s    min=820.98ms med=1.01s    max=1.63s    p(90)=1.29s    p(95)=1.39s
latency_imagor_1280x720..............: avg=318.72ms min=291.4ms  med=315.7ms  max=371.42ms p(90)=332.85ms p(95)=343.75ms
latency_imagor_1920x1080.............: avg=553.58ms min=513.99ms med=546.37ms max=770.93ms p(90)=553.56ms p(95)=578.74ms
latency_imagor_320x240...............: avg=225.15ms min=208.91ms med=221.78ms max=426.53ms p(90)=228.75ms p(95)=231.22ms
latency_imagor_3840x2160.............: avg=804.82ms min=761.27ms med=805.01ms max=862.46ms p(90)=815.11ms p(95)=818.27ms
latency_imagor_854x480...............: avg=290.36ms min=267.93ms med=287.39ms max=367.01ms p(90)=293.35ms p(95)=308.02ms
latency_imagor_cache_1280x720........: avg=5.45ms   min=934.25µs med=1.12ms   max=263.83ms p(90)=1.24ms   p(95)=1.33ms
latency_imagor_cache_1920x1080.......: avg=1.21ms   min=1.05ms   med=1.19ms   max=1.83ms   p(90)=1.3ms    p(95)=1.38ms
latency_imagor_cache_320x240.........: avg=1.02ms   min=933.12µs med=1ms      max=1.95ms   p(90)=1.05ms   p(95)=1.12ms
latency_imagor_cache_3840x2160.......: avg=2.03ms   min=1.66ms   med=1.81ms   max=3.45ms   p(90)=2.56ms   p(95)=2.73ms
latency_imagor_cache_854x480.........: avg=4.99ms   min=913.4µs  med=1.01ms   max=241.55ms p(90)=1.27ms   p(95)=1.33ms
latency_imgproxy_1280x720............: avg=644.6ms  min=438.82ms med=632.28ms max=943.25ms p(90)=826.82ms p(95)=862.25ms
latency_imgproxy_1920x1080...........: avg=763.77ms min=485.58ms med=729.43ms max=1.28s    p(90)=988.54ms p(95)=1.16s
latency_imgproxy_320x240.............: avg=640.93ms min=454.89ms med=620.82ms max=1.38s    p(90)=749.3ms  p(95)=906.6ms
latency_imgproxy_3840x2160...........: avg=810.03ms min=579.16ms med=814.46ms max=1.14s    p(90)=1.03s    p(95)=1.07s
latency_imgproxy_854x480.............: avg=659.22ms min=468.07ms med=638.25ms max=1.07s    p(90)=946.16ms p(95)=971.52ms
latency_mort_1280x720................: avg=578.38ms min=543.45ms med=574.73ms max=664.44ms p(90)=601.57ms p(95)=616.29ms
latency_mort_1920x1080...............: avg=546.89ms min=508.34ms med=543.14ms max=723.88ms p(90)=564.69ms p(95)=577.49ms
latency_mort_320x240.................: avg=516.86ms min=477.21ms med=501.53ms max=1.15s    p(90)=527ms    p(95)=568.65ms
latency_mort_3840x2160...............: avg=786.24ms min=738.33ms med=770.83ms max=1.17s    p(90)=806.38ms p(95)=836.89ms
latency_mort_854x480.................: avg=513.61ms min=479.63ms med=509.75ms max=556.14ms p(90)=535.82ms p(95)=539.51ms
latency_mort_cache_1280x720..........: avg=10.65ms  min=1.19ms   med=1.3ms    max=570.45ms p(90)=1.4ms    p(95)=1.5ms
latency_mort_cache_1920x1080.........: avg=10.13ms  min=1.16ms   med=1.37ms   max=535.09ms p(90)=1.47ms   p(95)=1.51ms
latency_mort_cache_320x240...........: avg=1.29ms   min=858.7µs  med=1.22ms   max=3.57ms   p(90)=1.36ms   p(95)=1.58ms
latency_mort_cache_3840x2160.........: avg=22.21ms  min=1.76ms   med=1.9ms    max=1.19s    p(90)=2.04ms   p(95)=2.08ms
latency_mort_cache_854x480...........: avg=13.06ms  min=1.07ms   med=1.26ms   max=718.73ms p(90)=1.49ms   p(95)=1.72ms
latency_picfit_1280x720..............: avg=1.05s    min=848.25ms med=1.01s    max=1.68s    p(90)=1.3s     p(95)=1.34s
latency_picfit_1920x1080.............: avg=938.49ms min=762.84ms med=895.28ms max=1.43s    p(90)=1.16s    p(95)=1.21s
latency_picfit_320x240...............: avg=1.19s    min=635.52ms med=1.17s    max=1.81s    p(90)=1.6s     p(95)=1.64s
latency_picfit_3840x2160.............: avg=1.22s    min=931.41ms med=1.15s    max=1.76s    p(90)=1.6s     p(95)=1.64s
latency_picfit_854x480...............: avg=908.66ms min=745.99ms med=862.96ms max=1.61s    p(90)=1.04s    p(95)=1.15s
latency_picfit_cache_1280x720........: avg=15.75ms  min=1.27ms   med=2.05ms   max=841.85ms p(90)=2.58ms   p(95)=2.81ms
latency_picfit_cache_1920x1080.......: avg=15.85ms  min=1.72ms   med=2.82ms   max=790.93ms p(90)=4.25ms   p(95)=4.42ms
latency_picfit_cache_320x240.........: avg=15.46ms  min=641.7µs  med=1.19ms   max=873.91ms p(90)=1.29ms   p(95)=1.34ms
latency_picfit_cache_3840x2160.......: avg=28.49ms  min=3.66ms   med=5.27ms   max=1.3s     p(90)=12.39ms  p(95)=12.58ms
latency_picfit_cache_854x480.........: avg=13.1ms   min=1.09ms   med=1.59ms   max=703.41ms p(90)=1.85ms   p(95)=1.91ms
latency_thumbor_1280x720.............: avg=332.36ms min=320.14ms med=329.98ms max=385.63ms p(90)=342.51ms p(95)=352.2ms
latency_thumbor_1920x1080............: avg=364.71ms min=353.64ms med=363.91ms max=400.95ms p(90)=373.22ms p(95)=382.18ms
latency_thumbor_320x240..............: avg=308.66ms min=297.52ms med=306.77ms max=339.4ms  p(90)=320.78ms p(95)=330.48ms
latency_thumbor_3840x2160............: avg=492.95ms min=478.51ms med=489.61ms max=550.9ms  p(90)=504.2ms  p(95)=513.57ms
latency_thumbor_854x480..............: avg=314.39ms min=304.83ms med=311.69ms max=339.14ms p(90)=324.19ms p(95)=327.72ms
latency_thumbor_cache_1280x720.......: avg=8.31ms   min=1.24ms   med=2.49ms   max=358.19ms p(90)=2.9ms    p(95)=2.97ms
latency_thumbor_cache_1920x1080......: avg=9.04ms   min=1.38ms   med=2.77ms   max=392.54ms p(90)=2.94ms   p(95)=3.16ms
latency_thumbor_cache_320x240........: avg=7.94ms   min=1.44ms   med=2.33ms   max=335.6ms  p(90)=2.6ms    p(95)=2.74ms
latency_thumbor_cache_3840x2160......: avg=127.37ms min=94.03ms  med=108.74ms max=423.79ms p(90)=154.22ms p(95)=198.82ms
latency_thumbor_cache_854x480........: avg=8.02ms   min=1.15ms   med=2.36ms   max=350.56ms p(90)=2.59ms   p(95)=2.67ms
latency_weserv_1280x720..............: avg=584.05ms min=708.72µs med=622.52ms max=1.49s    p(90)=861.64ms p(95)=885.62ms
latency_weserv_1920x1080.............: avg=629.66ms min=525.72µs med=730.28ms max=1.77s    p(90)=961.11ms p(95)=986.88ms
latency_weserv_320x240...............: avg=419.44ms min=663.06µs med=549.59ms max=1.03s    p(90)=769.6ms  p(95)=813.43ms
latency_weserv_3840x2160.............: avg=618.56ms min=708.83µs med=771.68ms max=1.58s    p(90)=1.01s    p(95)=1.02s
latency_weserv_854x480...............: avg=574.28ms min=811.15µs med=566.87ms max=1.32s    p(90)=862.96ms p(95)=984.45ms
latency_weserv_cache_1280x720........: avg=25.83ms  min=784.61µs med=845.94µs max=891.96ms p(90)=926.82µs p(95)=1.1ms
latency_weserv_cache_1920x1080.......: avg=24.68ms  min=782.5µs  med=927.02µs max=737.01ms p(90)=997.04µs p(95)=1.04ms
latency_weserv_cache_320x240.........: avg=23.2ms   min=624.27µs med=771.54µs max=773.02ms p(90)=868.42µs p(95)=995.43µs
latency_weserv_cache_3840x2160.......: avg=30.41ms  min=1.16ms   med=1.33ms   max=955.77ms p(90)=1.41ms   p(95)=1.5ms
latency_weserv_cache_854x480.........: avg=27.51ms  min=638.09µs med=799.2µs  max=826.9ms  p(90)=853.31µs p(95)=909.73µs
vus..................................: 0      min=0           max=1
vus_max..............................: 1      min=1           max=1
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
