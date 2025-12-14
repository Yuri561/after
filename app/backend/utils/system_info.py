import os
import psutil, platform, time

def get_system():
    vm = psutil.virtual_memory()
    disk = psutil.disk_usage("/")
    battery_life = psutil.sensors_battery()
    cpu_speed = psutil.cpu_freq()

    # Calculate uptime
    uptime_seconds = time.time() - psutil.boot_time()
    uptime_hours = int(uptime_seconds // 3600)
    uptime_minutes = int((uptime_seconds % 3600) // 60)

    system_info = {
        "cpu": psutil.cpu_percent(interval=None),
        "memory": vm.percent,
        "disk": disk.percent,
        "battery_percent": round(battery_life.percent, 1) if battery_life else None,
        "battery_plugged": battery_life.power_plugged if battery_life else None,
        "speed": round(cpu_speed.current / 1000, 2) if cpu_speed else 0,  # GHz
        "free_space": round(disk.free / (1024 ** 3), 1),
        "total_space": round(disk.total / (1024 ** 3), 1),
        "uptime": f"{uptime_hours}h {uptime_minutes}m",
        "hostname": platform.node(),
    }

    return system_info

