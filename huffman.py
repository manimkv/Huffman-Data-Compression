import sys
codes={}
def frequency(str):
   freq={}
   for ch in str:
      freq[ch]=freq.get(ch,0) + 1
   return freq

def sortfreq(freq):
   tuples=[(freq[k],k) for k in freq]
   tuples.sort()
   return tuples

def buildTree(tuples) :
   while len(tuples) > 1 :
       leastTwo = tuple(tuples[0:2])                
       Rest  = tuples[2:]                          
       combFreq = leastTwo[0][0] + leastTwo[1][0]     
       tuples   = Rest + [(combFreq,leastTwo)] 
       tuples.sort()                                
   return tuples[0]

def trimTree(tree):
   p=tree[1]
   if type(p)==type(""):
      return p
   else:
      return (trimTree(p[0]), trimTree(p[1]))

def assigncodes(node,patrn = ""):
   global codes
   if type(node) == type(""):
      codes[node] = patrn
   else:
      assigncodes(node[0], patrn + '0')
      assigncodes(node[1], patrn + '1')
   
def encode(str):
   global codes
   output=""
   for ch in str:
      output += codes[ch]   
   return output

def decode(tree,bitstr):
   output = ""
   p = tree
   for bit in bitstr:
      if bit == '0':  p = p[0]
      else:           p = p[1]
      if type(p) == type(""):
         output += p
         p = tree
   return output

def f(n,trim,bits):
   if n == 'y': 
      print "The encoded bits can be decoded as : ",decode(trim,bits)
   elif n == 'q':
      sys.exit(1)
   else:         
      n=raw_input("press 'y' or 'q'!!!! : " )
      f(n,trim,bits)

def main():
   str = raw_input("Enter the string: ")
   freq = frequency(str)
   tuples = sortfreq(freq)
   tree = buildTree(tuples)
   trim = trimTree(tree)
   assigncodes(trim)
   bits=encode(str)
   print 'yor data is encoded to : ',bits
   n=raw_input("if you want to decode the data or check whether the encoding is proper, press 'y', or press 'q' to quit : ")
   f(n,trim,bits)
main()   
