/******/ (() => { // webpackBootstrap
/*!*********************************************!*\
  !*** ./blocks/icon-add-to-card/src/view.js ***!
  \*********************************************/
const setButtonState = (button, isLoading) => {
  button.disabled = isLoading;
  button.setAttribute('aria-busy', isLoading ? 'true' : 'false');
};
const refreshFragments = async fragmentsUrl => {
  const response = await fetch(fragmentsUrl, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: ''
  });
  if (!response.ok) {
    return;
  }
  const data = await response.json();
  if (!data || !data.fragments) {
    return;
  }
  Object.entries(data.fragments).forEach(([selector, html]) => {
    document.querySelectorAll(selector).forEach(element => {
      element.outerHTML = html;
    });
  });
  if (data.cart_hash && window.localStorage) {
    window.localStorage.setItem('wc_cart_hash', data.cart_hash);
  }
  if (window.localStorage) {
    window.localStorage.setItem('wc_fragments', JSON.stringify(data.fragments));
    window.localStorage.setItem('wc_fragments_created', Date.now().toString());
  }
  document.body.dispatchEvent(new CustomEvent('btb:added_to_cart', {
    detail: {
      fragments: data.fragments,
      cartHash: data.cart_hash || ''
    }
  }));
};
const handleAddToCartClick = async event => {
  const button = event.target.closest('.btb-ajax-add-to-cart');
  if (!button) {
    return;
  }
  event.preventDefault();
  if (button.disabled) {
    return;
  }
  const addToCartUrl = button.dataset.addToCartUrl;
  const fragmentsUrl = button.dataset.fragmentsUrl;
  const productId = button.dataset.productId;
  const quantity = button.dataset.quantity || '1';
  if (!addToCartUrl || !productId) {
    return;
  }
  setButtonState(button, true);
  try {
    const body = new URLSearchParams({
      product_id: productId,
      quantity
    });
    const response = await fetch(addToCartUrl, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: body.toString()
    });
    if (!response.ok) {
      throw new Error('Add to cart request failed');
    }
    const data = await response.json();
    if (data && data.error && data.product_url) {
      window.location.assign(data.product_url);
      return;
    }
    if (data && data.fragments) {
      Object.entries(data.fragments).forEach(([selector, html]) => {
        document.querySelectorAll(selector).forEach(element => {
          element.outerHTML = html;
        });
      });
    } else if (fragmentsUrl) {
      await refreshFragments(fragmentsUrl);
    }
    button.classList.add('is-added');
  } catch (error) {
    console.error(error);
  } finally {
    setButtonState(button, false);
  }
};
document.addEventListener('click', handleAddToCartClick);
/******/ })()
;
//# sourceMappingURL=view.js.map