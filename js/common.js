/* ============================================
   LEARNING HUB – Shared JavaScript Utilities
   Pure vanilla JS, no dependencies
   ============================================ */

// Prevent FOUC for Light Theme
if (localStorage.getItem('lh_theme') === 'light') {
  document.body.classList.add('theme-light');
}

(function () {
  'use strict';

  /* --- Navigation Data --- */
  var NAV_PAGES = [
    { name: 'Home', href: 'index.html' },
    { name: 'Prompts', href: 'prompts.html' },
    { name: 'Redis', href: 'redis.html' },
    { name: 'Helm', href: 'helm.html' },
    { name: 'Elasticsearch', href: 'elasticsearch.html' },
    { name: 'Kafka', href: 'kafka.html' },
    { name: 'Saved', href: 'saved.html' }
  ];

  /* --- Determine active page --- */
  function getActivePage() {
    var path = window.location.pathname;
    var file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    return file;
  }

  /* --- Build and inject navigation --- */
  function buildNavigation() {
    var navPlaceholder = document.getElementById('nav-placeholder');
    if (!navPlaceholder) return;

    var active = getActivePage();

    var html = '<nav class="nav" role="navigation" aria-label="Main navigation">';
    html += '<div class="nav__container">';
    html += '<a href="index.html" class="nav__logo">⚡ Learning Hub</a>';

    // Search button in nav
    html += '<button class="nav__search-btn" id="nav-search-btn" aria-label="Search" title="Search (Ctrl+K)">';
    html += '<span class="nav__search-icon">🔍</span>';
    html += '<span class="nav__search-label">Search...</span>';
    html += '<span class="nav__search-shortcut">⌘K</span>';
    html += '</button>';

    // Theme toggle button
    html += '<button class="nav__theme-btn" id="nav-theme-btn" aria-label="Toggle Light/Dark Theme" style="background:transparent; border:none; color:var(--text-primary); cursor:pointer; margin-left:16px; font-size:1.2rem;">';
    html += document.body.classList.contains('theme-light') ? '🌙' : '☀️';
    html += '</button>';

    html += '<button class="nav__toggle" id="nav-toggle" aria-label="Toggle menu">';
    html += '<span></span><span></span><span></span></button>';
    html += '<ul class="nav__links" id="nav-links">';

    for (var i = 0; i < NAV_PAGES.length; i++) {
      var page = NAV_PAGES[i];
      var isActive = active === page.href;
      html += '<li><a href="' + page.href + '" class="nav__link';
      if (isActive) html += ' nav__link--active';
      html += '">' + page.name + '</a></li>';
    }

    html += '</ul></div></nav>';
    navPlaceholder.innerHTML = html;

    // Mobile toggle
    var toggle = document.getElementById('nav-toggle');
    var links = document.getElementById('nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
      });

      var allLinks = links.querySelectorAll('.nav__link');
      for (var j = 0; j < allLinks.length; j++) {
        allLinks[j].addEventListener('click', function () {
          toggle.classList.remove('active');
          links.classList.remove('open');
        });
      }

      document.addEventListener('click', function (e) {
        if (!toggle.contains(e.target) && !links.contains(e.target)) {
          toggle.classList.remove('active');
          links.classList.remove('open');
        }
      });
    }

    // Search button click
    var searchBtn = document.getElementById('nav-search-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', function () {
        openSearch();
      });
    }

    // Theme toggle click
    var themeBtn = document.getElementById('nav-theme-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        var isLight = document.body.classList.toggle('theme-light');
        localStorage.setItem('lh_theme', isLight ? 'light' : 'dark');
        themeBtn.innerHTML = isLight ? '🌙' : '☀️';
      });
    }
  }

  /* =============================================
     GLOBAL SEARCH
     ============================================= */

  var searchOverlay = null;
  var searchInput = null;
  var searchResults = null;
  var selectedIndex = -1;

  function buildSearchOverlay() {
    var overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.id = 'search-overlay';
    overlay.innerHTML =
      '<div class="search-modal">' +
        '<div class="search-modal__header">' +
          '<span class="search-modal__icon">🔍</span>' +
          '<input type="text" class="search-modal__input" id="global-search-input" placeholder="Search across all pages..." autocomplete="off" />' +
          '<button class="search-modal__close" id="search-close" aria-label="Close search">ESC</button>' +
        '</div>' +
        '<div class="search-modal__results" id="search-results">' +
          '<div class="search-modal__empty">Type to search across all topics, prompts, commands, and concepts...</div>' +
        '</div>' +
        '<div class="search-modal__footer">' +
          '<span class="search-modal__hint"><kbd>↑↓</kbd> Navigate</span>' +
          '<span class="search-modal__hint"><kbd>↵</kbd> Open</span>' +
          '<span class="search-modal__hint"><kbd>ESC</kbd> Close</span>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);
    searchOverlay = overlay;
    searchInput = document.getElementById('global-search-input');
    searchResults = document.getElementById('search-results');

    // Close on overlay click
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeSearch();
    });

    // Close button
    document.getElementById('search-close').addEventListener('click', closeSearch);

    // Input handler
    searchInput.addEventListener('input', function () {
      performSearch(this.value);
    });

    // Keyboard navigation
    searchInput.addEventListener('keydown', function (e) {
      var items = searchResults.querySelectorAll('.search-result');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        highlightResult(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, 0);
        highlightResult(items);
      } else if (e.key === 'Enter' && selectedIndex >= 0 && items[selectedIndex]) {
        e.preventDefault();
        var href = items[selectedIndex].getAttribute('data-href');
        if (href) window.location.href = href;
      } else if (e.key === 'Escape') {
        closeSearch();
      }
    });
  }

  function highlightResult(items) {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove('search-result--selected');
    }
    if (items[selectedIndex]) {
      items[selectedIndex].classList.add('search-result--selected');
      items[selectedIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  function performSearch(query) {
    selectedIndex = -1;
    if (!query || query.length < 2) {
      searchResults.innerHTML = '<div class="search-modal__empty">Type to search across all topics, prompts, commands, and concepts...</div>';
      return;
    }

    // Check if SEARCH_INDEX exists (loaded from search-data.js)
    if (typeof SEARCH_INDEX === 'undefined') {
      searchResults.innerHTML = '<div class="search-modal__empty">Search index not loaded. Make sure search-data.js is included.</div>';
      return;
    }

    var terms = query.toLowerCase().split(/\s+/);
    var results = [];

    for (var i = 0; i < SEARCH_INDEX.length; i++) {
      var entry = SEARCH_INDEX[i];
      var haystack = (entry.pageTitle + ' ' + entry.section + ' ' + entry.content).toLowerCase();
      var score = 0;
      var allMatch = true;

      for (var t = 0; t < terms.length; t++) {
        if (haystack.indexOf(terms[t]) !== -1) {
          score += 1;
          // Bonus for title/section match
          if (entry.section.toLowerCase().indexOf(terms[t]) !== -1) score += 2;
          if (entry.pageTitle.toLowerCase().indexOf(terms[t]) !== -1) score += 1;
        } else {
          allMatch = false;
        }
      }

      if (allMatch && score > 0) {
        results.push({ entry: entry, score: score });
      }
    }

    // Sort by relevance
    results.sort(function (a, b) { return b.score - a.score; });

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-modal__empty">No results found for "' + escapeHtml(query) + '"</div>';
      return;
    }

    var html = '';
    var maxResults = Math.min(results.length, 20);
    for (var r = 0; r < maxResults; r++) {
      var item = results[r].entry;
      html += '<a class="search-result" data-href="' + item.href + '" href="' + item.href + '">';
      html += '<div class="search-result__page">' + escapeHtml(item.pageTitle) + '</div>';
      html += '<div class="search-result__section">' + escapeHtml(item.section) + '</div>';
      html += '<div class="search-result__preview">' + getPreview(item.content, terms) + '</div>';
      html += '</a>';
    }

    if (results.length > maxResults) {
      html += '<div class="search-modal__more">... and ' + (results.length - maxResults) + ' more results</div>';
    }

    searchResults.innerHTML = html;
  }

  function getPreview(content, terms) {
    var lower = content.toLowerCase();
    var idx = -1;
    for (var i = 0; i < terms.length; i++) {
      idx = lower.indexOf(terms[i]);
      if (idx !== -1) break;
    }
    if (idx === -1) idx = 0;

    var start = Math.max(0, idx - 30);
    var end = Math.min(content.length, idx + 80);
    var snippet = (start > 0 ? '...' : '') + content.substring(start, end) + (end < content.length ? '...' : '');

    // Bold matching terms
    for (var t = 0; t < terms.length; t++) {
      var regex = new RegExp('(' + terms[t].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      snippet = snippet.replace(regex, '<mark>$1</mark>');
    }
    return snippet;
  }

  function openSearch() {
    if (!searchOverlay) buildSearchOverlay();
    searchOverlay.classList.add('active');
    searchInput.value = '';
    searchInput.focus();
    performSearch('');
    document.body.style.overflow = 'hidden';
  }

  function closeSearch() {
    if (searchOverlay) {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Keyboard shortcut: Ctrl+K or Cmd+K
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') {
      closeSearch();
    }
  });

  /* --- Background Orbs --- */
  function buildOrbs() {
    var orbsPlaceholder = document.getElementById('bg-orbs-placeholder');
    if (!orbsPlaceholder) return;

    var html = '<div class="bg-orbs">';
    html += '<div class="bg-orb bg-orb--1"></div>';
    html += '<div class="bg-orb bg-orb--2"></div>';
    html += '<div class="bg-orb bg-orb--3"></div>';
    html += '</div>';
    orbsPlaceholder.innerHTML = html;
  }

  /* --- Scroll-to-top Button --- */
  function buildScrollTop() {
    var btn = document.createElement('button');
    btn.className = 'scroll-top';
    btn.id = 'scroll-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.title = 'Scroll to top';
    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Scroll Reveal Animation --- */
  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            entries[i].target.classList.add('revealed');
            observer.unobserve(entries[i].target);
          }
        }
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      for (var i = 0; i < reveals.length; i++) {
        observer.observe(reveals[i]);
      }
    } else {
      for (var j = 0; j < reveals.length; j++) {
        reveals[j].classList.add('revealed');
      }
    }
  }

  /* --- Copy to Clipboard --- */
  window.copyToClipboard = function (text, btnElement) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showCopyFeedback(btnElement);
      });
    } else {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showCopyFeedback(btnElement);
      } catch (e) {
        // silent fail
      }
      document.body.removeChild(textarea);
    }
  };

  function showCopyFeedback(btn) {
    if (!btn) return;
    var original = btn.textContent;
    btn.textContent = '✓ Copied!';
    btn.style.color = '#10b981';
    setTimeout(function () {
      btn.textContent = original;
      btn.style.color = '';
    }, 2000);
  }

  /* --- Add Copy Buttons to Code Blocks --- */
  function initCodeCopyButtons() {
    var codeBlocks = document.querySelectorAll('.code-block');
    for (var i = 0; i < codeBlocks.length; i++) {
      var block = codeBlocks[i];
      var pre = block.querySelector('pre');
      if (!pre) continue;

      var btn = document.createElement('button');
      btn.className = 'code-block__copy';
      btn.textContent = 'Copy';
      btn.addEventListener('click', (function (codeEl, btnEl) {
        return function () {
          copyToClipboard(codeEl.textContent, btnEl);
        };
      })(pre, btn));
      block.appendChild(btn);
    }
  }

  /* --- Escape HTML --- */
  window.escapeHtml = function (str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  /* --- Footer --- */
  function buildFooter() {
    var footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;

    var year = new Date().getFullYear();
    footerPlaceholder.innerHTML =
      '<footer class="footer">' +
      '<p>Learning Hub © ' + year + ' — Pure HTML/CSS/JS. No frameworks. No dependencies.</p>' +
      '</footer>';
  }

  /* =============================================
     LOCAL STORAGE INTERACTIVE FEATURES
     ============================================= */

  window.LearningHubStorage = {
    // Bookmarks
    getBookmarks: function() {
      var data = localStorage.getItem('lh_bookmarks');
      return data ? JSON.parse(data) : [];
    },
    isBookmarked: function(id) {
      var bookmarks = this.getBookmarks();
      for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].id === id) return true;
      }
      return false;
    },
    toggleBookmark: function(id, title, contentSnippet, link) {
      var bookmarks = this.getBookmarks();
      var exists = false;
      var newBookmarks = [];
      
      for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].id === id) exists = true;
        else newBookmarks.push(bookmarks[i]);
      }
      
      if (!exists) {
        newBookmarks.push({
          id: id,
          title: title,
          content: contentSnippet,
          link: link,
          timestamp: new Date().toISOString()
        });
      }
      
      localStorage.setItem('lh_bookmarks', JSON.stringify(newBookmarks));
      return !exists;
    },
    
    // Progress Tracking
    getProgress: function() {
      var data = localStorage.getItem('lh_progress');
      return data ? JSON.parse(data) : {};
    },
    isSectionComplete: function(pageId, sectionId) {
      var prog = this.getProgress();
      return prog[pageId] && prog[pageId][sectionId] === true;
    },
    toggleSectionComplete: function(pageId, sectionId) {
      var prog = this.getProgress();
      if (!prog[pageId]) prog[pageId] = {};
      prog[pageId][sectionId] = !prog[pageId][sectionId];
      localStorage.setItem('lh_progress', JSON.stringify(prog));
      return prog[pageId][sectionId];
    },
    getTopicProgress: function(pageId, totalSections) {
      if (!totalSections) return 0;
      var prog = this.getProgress()[pageId];
      if (!prog) return 0;
      var completed = 0;
      for (var key in prog) {
        if (prog[key] === true) completed++;
      }
      return Math.round((completed / totalSections) * 100);
    }
  };

  /* --- Initialize Interactive Buttons --- */
  function initInteractiveUI() {
    var pageId = getActivePage().replace('.html', '');

    // Init Bookmarks
    var bookmarks = document.querySelectorAll('.bookmark-btn');
    for (var i = 0; i < bookmarks.length; i++) {
      var btn = bookmarks[i];
      var id = btn.getAttribute('data-id');
      if (!id) continue;
      
      if (window.LearningHubStorage.isBookmarked(id)) {
        btn.classList.add('active');
        btn.innerHTML = '★';
      } else {
        btn.innerHTML = '☆';
      }

      btn.addEventListener('click', function(e) {
        var button = e.currentTarget;
        var btnId = button.getAttribute('data-id');
        var title = button.getAttribute('data-title') || 'Saved Item';
        var link = window.location.pathname + '#' + (button.closest('section') ? button.closest('section').id : '');
        
        // Find nearest text content
        var contentEl = button.closest('.card') || button.closest('section');
        var snippet = contentEl ? contentEl.innerText.substring(0, 100) + '...' : '';

        var isNowBookmarked = window.LearningHubStorage.toggleBookmark(btnId, title, snippet, link);
        if (isNowBookmarked) {
          button.classList.add('active');
          button.innerHTML = '★';
        } else {
          button.classList.remove('active');
          button.innerHTML = '☆';
        }
      });
    }

    // Init Progress Buttons
    var readBtns = document.querySelectorAll('.mark-read-btn');
    for (var j = 0; j < readBtns.length; j++) {
      var rbtn = readBtns[j];
      var secId = rbtn.getAttribute('data-section-id');
      if (!secId) continue;

      if (window.LearningHubStorage.isSectionComplete(pageId, secId)) {
        rbtn.classList.add('completed');
        rbtn.innerHTML = 'Completed';
        var parentSec = rbtn.closest('section');
        if (parentSec) parentSec.classList.add('completed');
      }

      rbtn.addEventListener('click', function(e) {
        var button = e.currentTarget;
        var sId = button.getAttribute('data-section-id');
        var pSec = button.closest('section');
        
        var isComp = window.LearningHubStorage.toggleSectionComplete(pageId, sId);
        if (isComp) {
          button.classList.add('completed');
          button.innerHTML = 'Completed';
          if (pSec) pSec.classList.add('completed');
        } else {
          button.classList.remove('completed');
          button.innerHTML = 'Mark as Completed';
          if (pSec) pSec.classList.remove('completed');
        }
      });
    }
  }

  /* --- Anchor Links --- */
  function initAnchorLinks() {
    var sections = document.querySelectorAll('section[id]');
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      var title = section.querySelector('.section__title');
      if (title && !title.querySelector('.anchor-link-btn')) {
        var btn = document.createElement('button');
        btn.className = 'anchor-link-btn';
        btn.innerHTML = '🔗';
        btn.setAttribute('title', 'Copy link to this section');
        btn.setAttribute('data-id', section.id);
        
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          var id = this.getAttribute('data-id');
          var url = window.location.origin + window.location.pathname + '#' + id;
          
          navigator.clipboard.writeText(url).then(function() {
            var originalText = e.target.innerHTML;
            e.target.innerHTML = '✓';
            setTimeout(function() {
              e.target.innerHTML = originalText;
            }, 2000);
          }).catch(function(err) {
            console.error('Failed to copy link: ', err);
          });
        });
        
        title.appendChild(btn);
      }
    }
  }

  /* --- Initialize Everything --- */
  function init() {
    buildOrbs();
    buildNavigation();
    buildScrollTop();
    buildFooter();
    initCodeCopyButtons();
    initInteractiveUI();
    initAnchorLinks();
    setTimeout(initScrollReveal, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
