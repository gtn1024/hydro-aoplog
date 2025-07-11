import { $, addPage, NamedPage, ActionDialog } from "@hydrooj/ui-default";

addPage(new NamedPage(['aoplog_access', 'aoplog_login', 'aoplog_error'], async () => {
  $('[name="log_detail"]').on('click', async (e) => {
    e.preventDefault(); // 阻止默认的链接跳转行为
    e.stopPropagation(); // 阻止事件冒泡

    const logId = $(e.currentTarget).data('id') as string;
    const data = window.UiContext[`log-${logId}`];

    const content = Object.keys(data).filter(key => key !== '_id').map(key => {
      const c = data[key];
      if (typeof c === 'object') {
        return `<tr><td style="width: 120px">${key}</td><td>${JSON.stringify(c)}</td></tr>`;
      }
      if (key === 'createdAt') {
        return `<tr><td style="width: 120px">${key}</td><td>${new Date(c).toLocaleString()}</td></tr>`;
      }
      return `<tr><td style="width: 120px">${key}</td><td>${key === 'timeCost' ? c + 'ms' : c}</td></tr>`;
    })

    const confirmDialogContent = $(`
      <div style="position: relative">
        <div>
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 120px">Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              ${content.join('')}
            </tbody>
          </table>
        </div>
      </div>
    `);

    confirmDialogContent.appendTo(document.body);
    const confirmDialog = new ActionDialog({
      $body: confirmDialogContent,
    });
    confirmDialog.open();
  })
}))
