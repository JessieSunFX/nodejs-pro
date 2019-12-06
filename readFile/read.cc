#include <nan.h>
#include <fstream>
#include <iostream>
#include <string>

using namespace std;

void RunCallback(const Nan::FunctionCallbackInfo<v8::Value>& info) {

    v8::Local<v8::Function> cb = info[0].As<v8::Function>();

    // 定义一个文件名
    string file = "file.txt";
    ifstream infile;
    // 打开一个文件
    infile.open(file.data());
    // 定义一个长度为10的字符串
    size_t arrsize = 10;
    char* fileContent = new char[arrsize];
    int count = 0;
    while (!infile.eof())
    {
        infile >> fileContent[count++];
    }
    infile.close();

    const unsigned argc = 1;
    v8::Local<v8::Value> argv[argc] = {Nan::New(fileContent).ToLocalChecked()};
    Nan::MakeCallback(Nan::GetCurrentContext()->Global(), cb, argc, argv);
}

void Init(v8::Local<v8::Object> exports, v8::Local<v8::Object> module) {
    Nan::SetMethod(module, "exports", RunCallback);
}

NODE_MODULE(addon, Init);
