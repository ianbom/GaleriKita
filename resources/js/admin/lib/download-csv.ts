type CsvValue = string | number | boolean | null | undefined;

export function csvCell(value: CsvValue): string {
    const text = String(value ?? '');
    const safe = /^\s*[=+\-@]/.test(text) ? "'" + text : text;
    return '"' + safe.replaceAll('"', '""') + '"';
}

export function downloadCsv(
    filename: string,
    rows: readonly (readonly CsvValue[])[],
): void {
    const url = URL.createObjectURL(
        new Blob([rows.map((row) => row.map(csvCell).join(',')).join('\r\n')], {
            type: 'text/csv;charset=utf-8',
        }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
