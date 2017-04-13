var p = document.getElementById('result');
var word_input = document.getElementById('word_input');
var key_input = document.getElementById('key_input');
var btn_enc = document.getElementById('btn_enc');
var btn_dec = document.getElementById('btn_dec');

var p_16 = document.getElementById('result_16');
var word_input_16 = document.getElementById('word_input_16');
var key_input_16 = document.getElementById('key_input_16');
var btn_enc_16 = document.getElementById('btn_enc_16');
var btn_dec_16 = document.getElementById('btn_dec_16');

var timer_p = document.getElementById('p-timer');

function utoa(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function atou(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

p.ondblclick = function () {
	word_input.value = p.innerHTML;
}

p_16.ondblclick = function () {
	word_input_16.value = p_16.innerHTML;
}

btn_enc.onclick = function () {
	p.innerHTML = utoa(rc4_8(word_input.value, key_input.value)[0]);
}

btn_dec.onclick = function () {
	p.innerHTML = rc4_8(atou(word_input.value),key_input.value)[0];
}

btn_enc_16.onclick = function () {
	p_16.innerHTML = utoa(rc4_16(word_input_16.value, key_input_16.value)[0]);
}

btn_dec_16.onclick = function () {
	p_16.innerHTML = rc4_16(atou(word_input_16.value),key_input_16.value)[0];
}


function rc4_8(word, key) {
	var begin = Date.now();
	var s = [], k = [], x;
	var block_size = Math.pow(2, 8);
	key = key || ' ';
	for (var i = 0; i < block_size; i++) {
		s[i] = i;
	}

	for (i = 0; i < s.length; i++) {
		k[i] = key[i % key.length];
		k[i] = k[i].charCodeAt();
	}

	var j = 0;
	for (i = 0; i < block_size; i++) {
		j = (j + s[i] + k[i]) % (block_size);
		x = s[i];
		s[i] = s[j];
		s[j] = x;
	}

	i = 0; j = 0; var t, result = '';
	for (var l = 0; l < word.length; l++) {
		i = (i+1) % block_size;
		j = (j+s[i]) % block_size;
		x = s[i];
		s[i] = s[j];
		s[j] = x;
		t = (s[i] + s[j]) % block_size;
		result += String.fromCharCode(s[t] ^ word.charCodeAt(l));
	}
	var end = Date.now() - begin;
	return [result, end];
}

function rc4_16(word, key) {
	var begin = Date.now();
	var s = [], k = [], x;
	var block_size = Math.pow(2, 16);
	key = key || ' ';
	for (var i = 0; i < block_size; i++) {
		s[i] = i;
	}

	for (i = 0; i < s.length; i++) {
		k[i] = key[i % key.length];
		k[i] = k[i].charCodeAt();
	}

	var j = 0;
	for (i = 0; i < block_size; i++) {
		j = (j + s[i] + k[i]) % (block_size);
		x = s[i];
		s[i] = s[j];
		s[j] = x;
	}

	i = 0; j = 0; var t, result = '';
	for (var l = 0; l < word.length; l++) {
		i = (i+1) % block_size;
		j = (j+s[i]) % block_size;
		x = s[i];
		s[i] = s[j];
		s[j] = x;
		t = (s[i] + s[j]) % block_size;

		result += String.fromCharCode(s[t]%256 ^ word.charCodeAt(l));
	}
	var end = Date.now() - begin;
	return [result, end];
}

function bruteForceTime() {
	var combinations = Math.pow(161, 6);
	var counter = 0;
	for (var i = 0; i < 1000; i++) {
	 	counter += rc4_8('lambda','1*gGяП')[1];
	}
	counter /= 1000;
	var sec = (counter * combinations) / 1000;
	var years = sec / (365*24*60*60);
	return years;
}

function updateTimerDiv() {
  var text = "Время на дешифровку полным перебором (mixalpha-numeric-all-space-rus, 161<sup>6</sup>): ";
	timer_p.innerHTML = '';
	timer_p.innerHTML = text + bruteForceTime() + ' years';
}

document.addEventListener("DOMContentLoaded", updateTimerDiv);
document.getElementsByClassName('timer')[0].onclick = updateTimerDiv;
