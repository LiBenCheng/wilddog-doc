#!/usr/bin/env python

import pexpect
import sys
import os
import datetime
import shutil
def scpWithbackUp(localDir,remoteDir,backupDir,hosts):
	time=datetime.datetime.now().strftime('%Y%m%d%H%M%S')
	sp=remoteDir.split('/')
	name=sp[len(sp)-1]
	tgz = name+".tar.gz"
	res=pexpect.run('npm prune --production',cwd='dist')
	res=pexpect.run('tar -zcvf %s %s '%(tgz,localDir),withexitstatus=1,cwd='.')

	for host in hosts:
		scp=pexpect.spawn('scp  %s %s:%s'%(tgz,host,'~'),timeout=3000)
		scp.logfile = sys.stdout
		scp.expect(pexpect.EOF) 

		#ssh
		ssh = pexpect.spawn('ssh',[host])
		ssh.logfile = sys.stdout
		ssh.expect(']#')
	 	
	 	#backupfile
		ssh.sendline("mv %s %s"%(remoteDir,backupDir+"/"+name+"."+time))
		ssh.expect(']#')
		#unzip

		ssh.sendline('tar -xvf %s'%(tgz))
		ssh.expect(']#')

		#cleanup
		ssh.sendline('rm -f %s'%(tgz))
		ssh.expect(']#')

		#replece 
		ssh.sendline('mv %s %s'%(localDir,remoteDir))
		ssh.expect(']#')

def restartService(hosts,dir_,stop,start):
	for host in hosts:
		#ssh
		ssh = pexpect.spawn('ssh',[host])
		ssh.logfile = sys.stdout
		ssh.expect(']#')
		#cd to dir
		ssh.sendline("cd %s"%(dir_))
		ssh.expect(']#')

		#stop
		ssh.sendline(stop)
		ssh.expect(']#')
		#start

		ssh.sendline(start)
		ssh.expect(']#')





if __name__=="__main__":
	env=sys.argv[1]
	hosts=['test']
	if(env=='pre'):
		hosts=['1-006']
	if(env=='product'):
		hosts=['101','106']
	local= 'dist'
	remoteDir='/data/www/z.wilddog.com'
	backupDir='/data/www/backup'
	
	for host in hosts:
		scpWithbackUp(local,remoteDir,backupDir,[host]);
		restartService([host],remoteDir,'forever list','NODE_ENV=production forever restart /data/www/z.wilddog.com/bin/www')
