const defaultProduct = 'v1';
const productMap = {
  v1: {
    badge: 'Available on request',
    title: 'CLASSIC BUILD',
    version: 'Garadu v1.0',
    description: 'Classic Indori-style Garadu, freshly prepared with traditional spices, tangy flavours and the crunch we all love.',
    price: '₹ TBD',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80'
  },
  v2: {
    badge: 'Currently unavailable',
    title: 'HOTFIX',
    version: 'Garadu v2.0',
    description: 'A spicy upgrade to the classic! A bolder seasoning combination for people who like their snacks with extra heat.',
    price: '₹ TBD',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80'
  }
};

const selectedImage = document.getElementById('selected-image');
const selectedBadge = document.getElementById('selected-badge');
const selectedTitle = document.getElementById('selected-title');
const selectedVersion = document.getElementById('selected-version');
const selectedDescription = document.getElementById('selected-description');
const selectedPrice = document.getElementById('selected-price');
const versionButtons = document.querySelectorAll('.version-btn');
const productCards = document.querySelectorAll('.product-card');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const pollOptions = document.querySelectorAll('.poll-option');

function updateProduct(productKey) {
  const product = productMap[productKey];

  if (!product) return;

  selectedImage.src = product.image;
  selectedImage.alt = `${product.title} product`;
  selectedBadge.textContent = product.badge;
  selectedBadge.className = 'mono product-badge';
  selectedBadge.classList.add(product.badge === 'Available on request' ? 'badge-available' : 'badge-unavailable');
  selectedTitle.textContent = product.title;
  selectedVersion.textContent = product.version;
  selectedDescription.textContent = product.description;
  selectedPrice.textContent = product.price;

  versionButtons.forEach((button) => {
    const isActive = button.dataset.product === productKey;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  productCards.forEach((card) => {
    const isActive = card.dataset.product === productKey;
    card.classList.toggle('active', isActive);
  });
}

versionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    updateProduct(button.dataset.product);
  });
});

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

pollOptions.forEach((button) => {
  button.addEventListener('click', () => {
    const current = Number(button.querySelector('strong').textContent || '0');
    button.querySelector('strong').textContent = String(current + 1);
    pollOptions.forEach((option) => {
      if (option !== button) {
        option.disabled = true;
      }
    });
  });
});

updateProduct(defaultProduct);
