<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      processEscapes: true
    }
  });
</script>
    
<script type="text/javascript"
        src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>


## Inline formula 

Use may use in-line math formula, like $E = x \times c^2$ This formula works great, easy to type, elegent rendered.

## On it's own line

Any non-polynomial mathematical function can be expressed approximately as a series sum of polynomials. The
more terms we add, the closer the resultant equation is to the non-polynomial function. For instance, cos(x)
can be expressed very accurately in the range -0.5 to 0.5 by the series:

$$\cos(x)\approx 1 - \frac{x^2}{2} + \frac{x^4}{24} $$

However use need to use following at the top of markdown file:

```javascript
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      processEscapes: true
    }
  });
</script>
    
<script type="text/javascript"
        src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
```
