
function frequency(str)
	{
	freq={};
	len=str.length;
	for(var i=0;i<len;i++)
		{
		var ch=str[i];
		if(freq[ch]==undefined)
			freq[ch]=1;
		else
			freq[ch] += 1;
		}
	return freq;
	}

var str='aaabccdeeeeeffg';
freqs=frequency(str);

function sortfreq(freqs)
	{
	group=[];
	for(var keys in freqs)
		group.push([freqs[keys],keys]);
	return(group.sort());
	}

groups=sortfreq(freq);
console.log(groups);

function buildTree(groups)
	{
	while(groups.length>1)
		{
		var leastTwo=groups.slice(0,2);
		var rest=groups.slice(2,groups.length);
		var combFreq=leastTwo[0][0]+leastTwo[1][0];
		var groups=rest;
		var list=[combFreq,leastTwo];
		groups.push(list);
		groups.sort();
		}
	return groups[0];
	}

tree=buildTree(groups);

function trimTree(tree)
	{
	var p=tree[1];
	if(typeof p == 'string')
		return p;
	else
		return Array(trimTree(p[0]),trimTree(p[1]));
		
	}

trim=trimTree(tree);
var codes={};

function assigncode(trim,patrn)
	{
	patrn=patrn || "";	 
	if (typeof trim == 'string')
		codes[trim] = patrn;
	else
		{assigncode(trim[0],patrn + "0");
		assigncode(trim[1],patrn + "1");}
	}

assigncode(trim);

function encode(str)
	{
	var output="";
	for(i=0;i<str.length;i++)
		{output += codes[str[i]];}
	return output;	
	}

bitstr=encode(str);
console.log("given string can be encoded as : ",bitstr);

function decode(trim,bitstr)
	{
	var output = "";
	var p=trim;
	for(var i=0;i<bitstr.length;i++)
		{
		if(bitstr[i]=='0')
			p=p[0];
		else
			p=p[1];
		if (typeof p==='string')
			{output += p;
			p=trim;}
		}
	return output;
	}

console.log("decoding.......... : ",decode(trim,bitstr));
