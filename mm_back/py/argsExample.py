import sys


for line in sys.stdin:
    # mesg = input()
    print(" python line ", line)

print("python argsExample")  # hello ~
print("python args : ", sys.argv)  # ['py/hello.py']

sys.exit(0)