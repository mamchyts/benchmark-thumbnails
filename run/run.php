<?php

declare(strict_types=1);

// parse options from CMD
$cmdTests = ($argc === 1) ? [] : array_slice($argv, 1);

$testHash = getTestHash($cmdTests);

// run commands
foreach ($testHash as $title => $commands) {
    echo '----------------------- ' . $title . ' -----------------------' . PHP_EOL;
    echo executeCommands($commands) . PHP_EOL . PHP_EOL . PHP_EOL;
}


function getTestHash(array $cmdTests)
{
    $allTests = getAllTests();

    if (count($cmdTests) === 0) {
        return $allTests;
    }

    $tests = [];
    foreach ($allTests as $title => $test) {
        if (in_array($title, $cmdTests, true)) {
            $tests[$title] = $test;
        }
    }

    return $tests;
}


function getAllTests(): array
{
    // parse README.md
    $lines = explode("\n", file_get_contents(__DIR__ . '/../README.md'));

    $tests = [];
    for ($i = 0, $len = count($lines); $i < $len; $i++) {
        // try to detect test title
        preg_match('/### (\[(?<title>.*)\]\((?<url>.*)\))/iU', $lines[$i], $matchesTitle);
        if (\count($matchesTitle) === 0) {
            continue;
        }

        $tests[$matchesTitle['title']] = [];
        // try to parse test `run`
        for ($i++; $i < $len; $i++) {
            preg_match('/\*\*(?<resolution>.*)\*\*:\s`(?<cmd>.*)`/iU', $lines[$i], $matchesCmd);
            if (\count($matchesCmd) === 0) {
                break(1);
            }

            $tests[$matchesTitle['title']][$matchesCmd['resolution']] = trim($matchesCmd['cmd']);
        }
    }

    return $tests;
}


function executeCommands(array $commands): string
{
    $out = '';
    foreach ($commands as $resolution => $cmd) {
        [$outCmd, $outTime] = run($cmd);
        preg_match('/(1 threads and 1 connections)(.*)/ism', $outCmd, $matches);
        if (count($matches) === 0) {
            throw new Exception('Invalid output: ' . $outTime);
        }

        $out .= $resolution . PHP_EOL;
        $out .= trim($matches[2]) . PHP_EOL . PHP_EOL . PHP_EOL;

        sleep(10);
    }

    return $out;
}


function run(string $cmd): array
{
    $descriptorSpec = array(
        0 => array("pipe", "r"),  // stdin is a pipe that the child will read from
        1 => array("pipe", "w"),  // stdout is a pipe that the child will write to
        2 => array("pipe", "w"),  // stderr is a file to write to
    );

    $process = proc_open($cmd, $descriptorSpec, $pipes);
    if (is_resource($process)) {
        $outCmd = stream_get_contents($pipes[1]);
        $outTime = stream_get_contents($pipes[2]);
        fclose($pipes[0]);
        fclose($pipes[1]);
        fclose($pipes[2]);

        proc_close($process);
        return [$outCmd, $outTime];
    }

    throw new Exception('Can\'t run command: ' . $cmd);
}
