# 🖥️ Phase 1: Base System Setup

This guide walks you through setting up Ubuntu on your computer.

---

## 📋 What You Need

- **Computer:** Any PC or laptop (even old hardware works)
- **USB drive:** 8GB minimum
- **Internet connection**
- **~30 minutes** for installation

---

## 📥 Step 1: Download Ubuntu

1. Go to [ubuntu.com/download/desktop](https://ubuntu.com/download/desktop)
2. Download **Ubuntu 24.04 LTS** (Long Term Support)
3. Wait for the ~5GB ISO file to download

> 💡 **Why Ubuntu LTS?** Stable, low resources, 5 years of support, great for servers and automation.

---

## 💾 Step 2: Create Bootable USB

### On Windows (using Rufus)

1. Download [Rufus](https://rufus.ie/)
2. Insert your USB drive
3. Open Rufus
4. Select your USB drive
5. Click "SELECT" and choose the Ubuntu ISO
6. Click "START"
7. Wait for completion (~5-10 minutes)

### On Mac (using balenaEtcher)

1. Download [balenaEtcher](https://www.balena.io/etcher/)
2. Insert your USB drive
3. Open Etcher
4. Click "Flash from file" → select Ubuntu ISO
5. Click "Select target" → choose your USB
6. Click "Flash!"

### On Linux

```bash
# Find your USB device (usually /dev/sdb or /dev/sdc)
lsblk

# Write the ISO (replace sdX with your device)
sudo dd if=ubuntu-24.04-desktop-amd64.iso of=/dev/sdX bs=4M status=progress
```

---

## 🔧 Step 3: Boot from USB

This is where most people get stuck. Here's how to do it:

### Access Boot Menu

When your computer starts, press one of these keys repeatedly:

| Brand | Boot Menu Key | BIOS Key |
|-------|---------------|----------|
| **Dell** | F12 | F2 |
| **HP** | F9 or Esc | F10 |
| **Lenovo** | F12 | F1 or F2 |
| **Asus** | F8 or Esc | F2 or Del |
| **Acer** | F12 | F2 or Del |
| **MSI** | F11 | Del |
| **Toshiba** | F12 | F2 |
| **Samsung** | F10 | F2 |
| **Generic** | F12, F8, or Esc | F2 or Del |

### Common Issues & Solutions

#### ❌ USB doesn't appear in boot menu

**Try these fixes:**

1. **Disable Secure Boot**
   - Enter BIOS (see key above)
   - Find "Security" or "Boot" section
   - Set "Secure Boot" to **Disabled**
   - Save and exit

2. **Switch UEFI to Legacy (CSM)**
   - In BIOS, find "Boot Mode" or "CSM"
   - Try "Legacy" or "CSM Enabled"
   - Note: Modern systems prefer UEFI

3. **Check USB port**
   - Try a USB 2.0 port (sometimes more compatible)
   - Try a different USB port
   - Try a different USB drive

4. **Re-create the bootable USB**
   - The write might have failed
   - Use a different tool (try Ventoy as alternative)

#### ❌ "No bootable device found"

- USB wasn't created correctly
- Re-create with Rufus/Etcher
- Verify the ISO download wasn't corrupted

#### ❌ Boots into Windows anyway

- Enter BIOS
- Find "Boot Order" or "Boot Priority"
- Move USB to the top of the list
- Save and restart

---

## 💻 Step 4: Install Ubuntu

Once you boot from USB:

1. Select **"Try or Install Ubuntu"**
2. Choose your language (Español recommended for Mexico)
3. Select **"Install Ubuntu"**
4. Choose keyboard layout
5. Select **"Normal installation"**
6. Check "Download updates while installing"
7. Choose installation type:
   - **"Erase disk and install Ubuntu"** (for dedicated machine)
   - **"Install alongside"** (for dual boot with Windows)
8. Set your timezone (Mexico City for CST)
9. Create your user account
10. Wait for installation (~15-20 minutes)
11. Restart when prompted
12. Remove USB when asked

---

## ✅ Step 5: Post-Install Basics

After first boot, run these commands in Terminal (`Ctrl+Alt+T`):

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install -y curl wget git vim htop net-tools

# Set up SSH (for remote access)
sudo apt install -y openssh-server
sudo systemctl enable ssh
sudo systemctl start ssh
```

---

## 🎉 Done!

You now have a clean Ubuntu installation ready for the next phase.

**Next:** [02-tools-setup.md](02-tools-setup.md) — Installing the tool stack

---

## 🆘 Need Help?

If you get stuck at any step, common resources:

- [Ask Ubuntu](https://askubuntu.com/) — Q&A community
- [Ubuntu Forums](https://ubuntuforums.org/) — Discussion forums
- [Ubuntu Documentation](https://help.ubuntu.com/) — Official docs

Or reach out to the OpenClaw community!
