/**
 * ckEditor 编辑器的默认配置项
 * @param config
 */
CKEDITOR.editorConfig = function (config) {
  // 工具栏，两行
  config.toolbarGroups = [
    {name: 'clipboard', groups: ['clipboard', 'undo']},
    {name: 'editing', groups: ['find', 'selection', 'spellchecker']},
    {name: 'links'},
    {name: 'insert'},
    {name: 'forms'},
    {name: 'tools'},
    {name: 'document', groups: ['mode', 'document', 'doctools']},
    {name: 'others'},
    '/',
    {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
    {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi']},
    {name: 'styles'},
    {name: 'colors'},
    {name: 'about'}
  ];
  // 删除标准工具栏中不需要的标准插件提供的一些按钮
  config.removeButtons = 'Underline,Subscript,Superscript';
  // 设置最常用的元素
  config.format_tags = 'p;h1;h2;h3;pre';
  // 简化对话框窗口
  config.removeDialogTabs = 'image:advanced;link:advanced;image:Link';
  //上传图片的弹框中，预览区域显示内容
  config.image_previewText = ' ';
  //上传图片使用的方法（默认）
  config.filebrowserImageUploadUrl = "/upload/basic/uploadGoodsForCkEditor";
  //设置编辑器高度
  // config.height = 1000;
  //上传图片后，不自动设置宽和高
  config.disallowedContent = 'img{width,height};img[width,height]'
};
