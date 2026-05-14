// Persist all user toggles to chrome.storage.local so content scripts can read them.
function save_options() {
  var block_60fps = document.getElementById('block_60fps').checked;
  var block_h264 = document.getElementById('block_h264').checked;
  var block_vp8 = document.getElementById('block_vp8').checked;
  var block_vp9 = document.getElementById('block_vp9').checked;
  var block_av1 = document.getElementById('block_av1').checked;
  var block_opus = document.getElementById('block_opus').checked;
  var block_mp4a = document.getElementById('block_mp4a').checked;
  // LN = loudness normalization. "true" means disable YouTube's loudness processing.
  var disable_LN = document.getElementById('disable_LN').checked;
  var block_distractions = document.getElementById('block_distractions').checked;

  chrome.storage.local.set({
    block_60fps: block_60fps,
    block_h264: block_h264,
    block_vp8: block_vp8,
    block_vp9: block_vp9,
    block_av1: block_av1,
    block_opus: block_opus,
    block_mp4a: block_mp4a,
    disable_LN: disable_LN,
    block_distractions: block_distractions
  });

  update_mode_indicator(block_distractions);
}

// Render friendly relax mode state with emoji.
function update_mode_indicator(enabled) {
  var indicator = document.getElementById('mode_indicator');
  indicator.textContent = enabled
    ? '😌 ' + chrome.i18n.getMessage('optionsRelaxModeOn')
    : '😴 ' + chrome.i18n.getMessage('optionsRelaxModeOff');
}

// Restore from storage with explicit defaults.
// Requested defaults: VP8/VP9/AV1 block toggles are OFF by default.
function restore_options() {
  chrome.storage.local.get({
    block_60fps: false,
    block_h264: false,
    block_vp8: false,
    block_vp9: false,
    block_av1: false,
    block_opus: false,
    block_mp4a: false,
    disable_LN: true,
    block_distractions: false
  }, function(options) {
    document.getElementById('block_60fps').checked = options.block_60fps;
    document.getElementById('block_h264').checked = options.block_h264;
    document.getElementById('block_vp8').checked = options.block_vp8;
    document.getElementById('block_vp9').checked = options.block_vp9;
    document.getElementById('block_av1').checked = options.block_av1;
    document.getElementById('block_opus').checked = options.block_opus;
    document.getElementById('block_mp4a').checked = options.block_mp4a;
    document.getElementById('disable_LN').checked = options.disable_LN;
    document.getElementById('block_distractions').checked = options.block_distractions;
    update_mode_indicator(options.block_distractions);
  });
}

document.addEventListener('DOMContentLoaded', restore_options);

var checkboxes = document.getElementsByClassName('checkbox');
for (var i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('click', save_options);
}

for (let element of document.querySelectorAll('[data-l10n-id]')) {
  element.textContent = chrome.i18n.getMessage(element.dataset.l10nId);
}
