@echo off
for /l %%i in (0,1,5461) do (
	redis-cli -h 127.0.0.1 -p 7000 cluster addslots %%i
)
pause