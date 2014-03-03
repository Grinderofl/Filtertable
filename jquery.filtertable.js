(function($) {
    $.fn.filterTable = function (targets, options) {
        var settings = $.extend({
            className: 'hidden',
            matchAll:true
        }, options);

        var targetTable = $(this);
       
        $(targets).each(function () {
            $(this).keyup(function() {
                $(this).change();
            });
            $(this).change(function() {
                targetTable.find('tbody tr').each(function() {
                    if (!satisfiesCriteria($(this)))
                        $(this).addClass(settings.className);
                    else
                        $(this).removeClass(settings.className);
                });
            });
        });

        function satisfiesCriteria(row) {
            var count = 0;
            var total = $(targets).length;
            $(targets).each(function () {
                var value = $(this).val().toLowerCase();
                var ignore = $(this).attr('filter-ignore') != undefined ? $(this).attr('filter-ignore').toLowerCase() : '';
                if (value == '' || value == ignore) {
                    count++;
                    return;
                }
                var tar = $(this).attr('filter-target');
                
                var column = row.find(tar);
                if (column.html().toLowerCase().indexOf(value) > -1) {
                    count++;
                } 
            });

            if (settings.matchAll)
                return count == total;
            return count > 0;
        }
    };
}
(jQuery));

