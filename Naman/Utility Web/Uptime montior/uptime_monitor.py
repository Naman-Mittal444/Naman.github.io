# uptime_monitor.py
import requests
import sqlite3
import smtplib
from datetime import datetime

def check_website(url):
    try:
        response = requests.get(url, timeout=10)
        return response.status_code == 200
    except:
        return False

def send_alert(url, status):
    # Email alert logic
    with smtplib.SMTP('smtp.gmail.com') as s:
        s.sendmail(
            "monitor@example.com",
            "admin@example.com",
            f"ALERT: {url} is DOWN!"
        )

def log_result(url, status):
    conn = sqlite3.connect('uptime.db')
    conn.execute('''
        INSERT INTO pings 
        (url, status, timestamp)
        VALUES (?, ?, ?)
    ''', (url, status, datetime.now()))
    conn.commit()

# Main monitoring loop
urls = ["https://google.com", ...]
for url in urls:
    is_up = check_website(url)
    log_result(url, is_up)
    if not is_up:
        send_alert(url, "DOWN")
