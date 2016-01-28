#!/usr/bin/env python

import pexpect
import sys
import os
import datetime

time=datetime.datetime.now().strftime('%Y%m%d%H%M%S')
remote = 'root@10.18.2.200'
remotePath = '/data/www'
remoteDir = 'z.wilddog.com'
tgz = "dist.tar.gz"
localDir = "./dist"
pexpect.run('tar -cvf %s %s '%(tgz,localDir),cwd='.')
pexpect.run('scp %s %s:%s'%(tgz,remote,remotePath),cwd=".")


#ssh
ssh = pexpect.spawn('ssh',[remote])
ssh.logfile = sys.stdout
ssh.expect('#')

# cd to /data/www
ssh.sendline("cd %s"%(remotePath))
ssh.expect('#')

#backupfile
ssh.sendline("mv %s %s"%(remoteDir,"backup/"+remoteDir+"."+time))
ssh.expect('#')

#unzip file
ssh.sendline('tar -xvf %s'%(tgz))
ssh.expect('#')

#cleanup
ssh.sendline('rm -f %s'%(tgz))
ssh.expect('#')

#replece z.wilddog.com
ssh.sendline('mv %s %s'%(localDir,remoteDir))
ssh.expect('#')

#cd to z.wilddog.com
ssh.sendline('cd %s'%(remoteDir))
ssh.expect('#')


# start
ssh.sendline('NODE_ENV=production forever restart /data/www/z.wilddog.com/bin/www')
ssh.expect('#')

# cleanup
pexpect.run('rm -f %s'%(tgz),cwd='..')

