// changy.js
document.querySelectorAll('.box').forEach(box => {
  box.addEventListener('mouseenter', function() {
      const imageUrl = this.getAttribute('data-bg');
      document.body.style.backgroundImage = `url(${imageUrl})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
  });

  box.addEventListener('mouseleave', function() {
      document.body.style.backgroundImage = '';
  });
});
