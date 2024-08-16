## Cài đặt 
Prj yêu cầu node >= 18 
Cài đặt pkg: `yarn`
Khởi động: `yarn dev`

## Mục tiêu

Nhận diện các công thức toán học trong đoạn văn bản ở `src/exampleMd.md` và render nó dùng mathjax

## Vấn đề

Cú pháp để sử dụng mathjax trong mathdown-it-mathjax3 là

- inlineMath: `$1+1$`
- blockMath: `$$ 1 + 2 $$`

Còn trong văn bản trên sử dụng cú pháp

- inlineMath: \\(1+1\\)
- blockMath:
  \\[
  1+1=2
  \\]

## Hướng giải quyết

Mathjax cho phép [ cấu hình cú pháp ](https://docs.mathjax.org/en/latest/web/configuration.html) tuy nhiên plugin mathdown-it-mathjax đã fix cứng cú pháp ở 2 hàm `math-inline` và `math-block`

## Cần tìm hiểu

[markdown-it design principle](https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md)

[markdown-it ruler](https://markdown-it.github.io/markdown-it/#Ruler)

[Adding or modifying rules](https://github.com/markdown-it/markdown-it/blob/master/docs/examples/renderer_rules.md) (_optional_)

## Sự khác nhau giữa ruler và rules

Ruler là để quản lý hoặc nhận biết một luật gì đó trong mdit.

Còn Rules là đối với quy luật đấy thì người dùng muốn thực hiện chức năng gì

VD:

```ts
md.inline.ruler.after("escape", "math_inline", math_inline);
```

Ở đây ta thêm một luật mới đằng sau luật `escape` tên là `math_inline`  
Hàm `math_inline` chính là luật. Hàm này trả về kiểu boolean

```ts
md.renderer.rules.math_inline = function (tokens: Token[], idx: number) {
  convertOptions.display = false;
  return renderMath(tokens[idx].content, documentOptions, convertOptions);
};
```

Đối với luật `math_inline` chúng ta muốn thực hiện chức năng trên
