﻿/**
* Copyright (c) 2013, Adobe Systems Inc.
* All rights reserved.
* 
* Redistribution and use in source and binary forms, with or without modification, are permitted provided 
* that the following conditions are met:
* - Redistributions of source code must retain the above copyright notice, this list of conditions and the 
*   following disclaimer.
* - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and 
*   the following disclaimer in the documentation and/or other materials provided with the distribution.
* - Neither the name of Adobe Systems Inc. nor the names of its contributors may be used to endorse or 
*   promote products derived from this software without specific prior written permission.
* 
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED 
* WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A 
* PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR 
* ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT 
* LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR 
* TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF 
* ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

BitmapSymbol = function(xml){
	this.xml = xml;
}
var p = BitmapSymbol.prototype;

p.xml;
p.name;
p.src;
p.frame;

p.toString = function(t) {
	if (!this.frame)
		var str = 
			 t+'class '+this.name+' extends Bitmap {\n'
			+t+'  static BitmapData bmp;\n'
			+t+'  '+this.name+'():super(bmp) {\n'
			+t+'    if (bitmapData == null) bitmapData = bmp = resources.getBitmapData("'+this.name+'");\n'
			+t+'  }\n'
			+t+'}\n';
	else
		var str =
			 t+'class '+this.name+' extends Bitmap {\n'
			+t+'  static BitmapData bmp;\n'
			+t+'  '+this.name+'():super(bmp) {\n'
			+t+'    if (bitmapData == null) bitmapData = bmp = resources.getTextureAtlas("'+this.frame.atlas
				+'").getBitmapData("'+this.frame.name+'");\n'
			+t+'  }\n'
			+t+'}\n';
	return str;
}

p.exportFile = function(sourcePath, destPath, exportPath) {
	if (this.frame) return;
	var source = this.xml.@href;
	var filename = source.split("/").pop();

	this.src = destPath + filename;
	if (exportPath && !copyFile(sourcePath+source, exportPath + filename, true)) {
		Log.error("EJS_E_IMGEXP",this.src);
	}
}

p.isEmpty = function() {
	return false;
}
