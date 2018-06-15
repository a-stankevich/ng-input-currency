(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = angular.module('ngInputCurrency', []).name;

angular.module('ngInputCurrency').service('ngInputCurrencyService', ['$locale', function($locale) {
  this.toFloat = function(str) {
    if (angular.isNumber(str))
      return parseFloat(str, 10);

    if (!angular.isString(str))
      throw new TypeError('ngInputCurrencyService.toFloat expects argument to be a String, but was given ' + str);

    str = str
      .replace(new RegExp(this.stringToRegExp($locale.NUMBER_FORMATS.GROUP_SEP), 'g'), '')
      .replace(new RegExp(this.stringToRegExp($locale.NUMBER_FORMATS.CURRENCY_SYM), 'g'), '')
      .replace(new RegExp(this.stringToRegExp($locale.NUMBER_FORMATS.DECIMAL_SEP), 'g'), '.');

    return parseFloat(str, 10);
  };

  this.stringToRegExp = function(str, opt) {
    return str.replace(/\./g,'\\.')
         .replace(/\[/g, '\\[')
         .replace(/\]/g, '\\]')
         .replace(/\,/g, '\\,')
         .replace(/\|/g, '\\|')
         .replace(/\)/g, '\\)')
         .replace(/\(/g, '\\(')
         .replace(/\^/g, '\\^')
         .replace(/\$/g, '\\$')
         .replace(/\_/g, '\\_')
         .replace(/\?/g, '\\?')
         .replace(/\-/g, '\\-');
  };

  this.isValid = function(val) {
    return angular.isNumber(val) && !isNaN(val);
  };

  this.preformatValue = function(val) {
    if (!angular.isString(val))
      return val;

    val = val.replace($locale.NUMBER_FORMATS.CURRENCY_SYM, '')

    var groupRegex = new RegExp(this.stringToRegExp($locale.NUMBER_FORMATS.GROUP_SEP), 'g'),
        decimalRegex = new RegExp(this.stringToRegExp($locale.NUMBER_FORMATS.DECIMAL_SEP), 'g');

    var groupMatch = val.match(groupRegex), decimalMatch = val.match(decimalRegex);
    if (groupMatch && groupMatch.length == 1 && (!decimalMatch || decimalMatch.length === 0))
      return val.replace(groupRegex, '.');

    if (decimalMatch && decimalMatch.length == 1 && (!groupMatch || groupMatch.length === 0))
      return val.replace(decimalRegex, '.');

    return val;
  };
}]);

angular.module('ngInputCurrency').directive('ngInputCurrency', ['$locale','$filter','ngInputCurrencyService','$timeout', function($locale, $filter, util, $timeout) {
  var link = function($scope, $element, $attrs, $ngModel){

    var opts = {
      updateOn: 'blur enter',
      updateOnDefault: false
    };
    if ($ngModel.$options !== null && $ngModel.$options !== undefined)
      opts = $ngModel.$options.createChild(opts);

    $ngModel.$options = opts;

    var filter = $filter('currency');
    $ngModel.$formatters.push(function fromModelToView(value) {
      return filter(value);
    });

    $ngModel.$parsers.push(function(value) {
      var currency = util.toFloat(value);
      if (util.isValid(currency)) {
        $ngModel.$setViewValue(filter(currency));
        $ngModel.$render();
        return currency;
      }
    });

    $element.on('blur', function(){
      if ($ngModel.$viewValue === $ngModel.$modelValue)
        $element.val(filter($ngModel.$modelValue));
    });

    $element.on('focus', function(){
      if (util.isValid($ngModel.$modelValue)) {
        $ngModel.$setViewValue($ngModel.$modelValue);
        $ngModel.$render();
      }
    });

    $ngModel.$validators.currency = function(modelValue) {
      return util.isValid(modelValue);
    };

  };
  return {
    'restrict': 'A',
    'require': 'ngModel',
    'link': link
  };
}]);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbmctaW5wdXQtY3VycmVuY3kuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwibW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnbmdJbnB1dEN1cnJlbmN5JywgW10pLm5hbWU7XG5cbmFuZ3VsYXIubW9kdWxlKCduZ0lucHV0Q3VycmVuY3knKS5zZXJ2aWNlKCduZ0lucHV0Q3VycmVuY3lTZXJ2aWNlJywgWyckbG9jYWxlJywgZnVuY3Rpb24oJGxvY2FsZSkge1xuICB0aGlzLnRvRmxvYXQgPSBmdW5jdGlvbihzdHIpIHtcbiAgICBpZiAoYW5ndWxhci5pc051bWJlcihzdHIpKVxuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoc3RyLCAxMCk7XG5cbiAgICBpZiAoIWFuZ3VsYXIuaXNTdHJpbmcoc3RyKSlcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ25nSW5wdXRDdXJyZW5jeVNlcnZpY2UudG9GbG9hdCBleHBlY3RzIGFyZ3VtZW50IHRvIGJlIGEgU3RyaW5nLCBidXQgd2FzIGdpdmVuICcgKyBzdHIpO1xuXG4gICAgc3RyID0gc3RyXG4gICAgICAucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMuc3RyaW5nVG9SZWdFeHAoJGxvY2FsZS5OVU1CRVJfRk9STUFUUy5HUk9VUF9TRVApLCAnZycpLCAnJylcbiAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5zdHJpbmdUb1JlZ0V4cCgkbG9jYWxlLk5VTUJFUl9GT1JNQVRTLkNVUlJFTkNZX1NZTSksICdnJyksICcnKVxuICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLnN0cmluZ1RvUmVnRXhwKCRsb2NhbGUuTlVNQkVSX0ZPUk1BVFMuREVDSU1BTF9TRVApLCAnZycpLCAnLicpO1xuXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc3RyLCAxMCk7XG4gIH07XG5cbiAgdGhpcy5zdHJpbmdUb1JlZ0V4cCA9IGZ1bmN0aW9uKHN0ciwgb3B0KSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXC4vZywnXFxcXC4nKVxuICAgICAgICAgLnJlcGxhY2UoL1xcWy9nLCAnXFxcXFsnKVxuICAgICAgICAgLnJlcGxhY2UoL1xcXS9nLCAnXFxcXF0nKVxuICAgICAgICAgLnJlcGxhY2UoL1xcLC9nLCAnXFxcXCwnKVxuICAgICAgICAgLnJlcGxhY2UoL1xcfC9nLCAnXFxcXHwnKVxuICAgICAgICAgLnJlcGxhY2UoL1xcKS9nLCAnXFxcXCknKVxuICAgICAgICAgLnJlcGxhY2UoL1xcKC9nLCAnXFxcXCgnKVxuICAgICAgICAgLnJlcGxhY2UoL1xcXi9nLCAnXFxcXF4nKVxuICAgICAgICAgLnJlcGxhY2UoL1xcJC9nLCAnXFxcXCQnKVxuICAgICAgICAgLnJlcGxhY2UoL1xcXy9nLCAnXFxcXF8nKVxuICAgICAgICAgLnJlcGxhY2UoL1xcPy9nLCAnXFxcXD8nKVxuICAgICAgICAgLnJlcGxhY2UoL1xcLS9nLCAnXFxcXC0nKTtcbiAgfTtcblxuICB0aGlzLmlzVmFsaWQgPSBmdW5jdGlvbih2YWwpIHtcbiAgICByZXR1cm4gYW5ndWxhci5pc051bWJlcih2YWwpICYmICFpc05hTih2YWwpO1xuICB9O1xuXG4gIHRoaXMucHJlZm9ybWF0VmFsdWUgPSBmdW5jdGlvbih2YWwpIHtcbiAgICBpZiAoIWFuZ3VsYXIuaXNTdHJpbmcodmFsKSlcbiAgICAgIHJldHVybiB2YWw7XG5cbiAgICB2YWwgPSB2YWwucmVwbGFjZSgkbG9jYWxlLk5VTUJFUl9GT1JNQVRTLkNVUlJFTkNZX1NZTSwgJycpXG5cbiAgICB2YXIgZ3JvdXBSZWdleCA9IG5ldyBSZWdFeHAodGhpcy5zdHJpbmdUb1JlZ0V4cCgkbG9jYWxlLk5VTUJFUl9GT1JNQVRTLkdST1VQX1NFUCksICdnJyksXG4gICAgICAgIGRlY2ltYWxSZWdleCA9IG5ldyBSZWdFeHAodGhpcy5zdHJpbmdUb1JlZ0V4cCgkbG9jYWxlLk5VTUJFUl9GT1JNQVRTLkRFQ0lNQUxfU0VQKSwgJ2cnKTtcblxuICAgIHZhciBncm91cE1hdGNoID0gdmFsLm1hdGNoKGdyb3VwUmVnZXgpLCBkZWNpbWFsTWF0Y2ggPSB2YWwubWF0Y2goZGVjaW1hbFJlZ2V4KTtcbiAgICBpZiAoZ3JvdXBNYXRjaCAmJiBncm91cE1hdGNoLmxlbmd0aCA9PSAxICYmICghZGVjaW1hbE1hdGNoIHx8IGRlY2ltYWxNYXRjaC5sZW5ndGggPT09IDApKVxuICAgICAgcmV0dXJuIHZhbC5yZXBsYWNlKGdyb3VwUmVnZXgsICcuJyk7XG5cbiAgICBpZiAoZGVjaW1hbE1hdGNoICYmIGRlY2ltYWxNYXRjaC5sZW5ndGggPT0gMSAmJiAoIWdyb3VwTWF0Y2ggfHwgZ3JvdXBNYXRjaC5sZW5ndGggPT09IDApKVxuICAgICAgcmV0dXJuIHZhbC5yZXBsYWNlKGRlY2ltYWxSZWdleCwgJy4nKTtcblxuICAgIHJldHVybiB2YWw7XG4gIH07XG59XSk7XG5cbmFuZ3VsYXIubW9kdWxlKCduZ0lucHV0Q3VycmVuY3knKS5kaXJlY3RpdmUoJ25nSW5wdXRDdXJyZW5jeScsIFsnJGxvY2FsZScsJyRmaWx0ZXInLCduZ0lucHV0Q3VycmVuY3lTZXJ2aWNlJywnJHRpbWVvdXQnLCBmdW5jdGlvbigkbG9jYWxlLMKgJGZpbHRlciwgdXRpbCwgJHRpbWVvdXQpIHtcbiAgdmFyIGxpbmsgPSBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRuZ01vZGVsKXtcblxuICAgIHZhciBvcHRzID0ge1xuICAgICAgdXBkYXRlT246ICdibHVyIGVudGVyJyxcbiAgICAgIHVwZGF0ZU9uRGVmYXVsdDogZmFsc2VcbiAgICB9O1xuICAgIGlmICgkbmdNb2RlbC4kb3B0aW9ucyAhPT0gbnVsbCAmJiAkbmdNb2RlbC4kb3B0aW9ucyAhPT0gdW5kZWZpbmVkKVxuICAgICAgb3B0cyA9ICRuZ01vZGVsLiRvcHRpb25zLmNyZWF0ZUNoaWxkKG9wdHMpO1xuXG4gICAgJG5nTW9kZWwuJG9wdGlvbnMgPSBvcHRzO1xuXG4gICAgdmFyIGZpbHRlciA9ICRmaWx0ZXIoJ2N1cnJlbmN5Jyk7XG4gICAgJG5nTW9kZWwuJGZvcm1hdHRlcnMucHVzaChmdW5jdGlvbiBmcm9tTW9kZWxUb1ZpZXcodmFsdWUpIHtcbiAgICAgIHJldHVybiBmaWx0ZXIodmFsdWUpO1xuICAgIH0pO1xuXG4gICAgJG5nTW9kZWwuJHBhcnNlcnMucHVzaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIGN1cnJlbmN5ID0gdXRpbC50b0Zsb2F0KHZhbHVlKTtcbiAgICAgIGlmICh1dGlsLmlzVmFsaWQoY3VycmVuY3kpKSB7XG4gICAgICAgICRuZ01vZGVsLiRzZXRWaWV3VmFsdWUoZmlsdGVyKGN1cnJlbmN5KSk7XG4gICAgICAgICRuZ01vZGVsLiRyZW5kZXIoKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbmN5O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJGVsZW1lbnQub24oJ2JsdXInLCBmdW5jdGlvbigpe1xuICAgICAgaWYgKCRuZ01vZGVsLiR2aWV3VmFsdWUgPT09ICRuZ01vZGVsLiRtb2RlbFZhbHVlKVxuICAgICAgICAkZWxlbWVudC52YWwoZmlsdGVyKCRuZ01vZGVsLiRtb2RlbFZhbHVlKSk7XG4gICAgfSk7XG5cbiAgICAkZWxlbWVudC5vbignZm9jdXMnLCBmdW5jdGlvbigpe1xuICAgICAgaWYgKHV0aWwuaXNWYWxpZCgkbmdNb2RlbC4kbW9kZWxWYWx1ZSkpIHtcbiAgICAgICAgJG5nTW9kZWwuJHNldFZpZXdWYWx1ZSgkbmdNb2RlbC4kbW9kZWxWYWx1ZSk7XG4gICAgICAgICRuZ01vZGVsLiRyZW5kZXIoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRuZ01vZGVsLiR2YWxpZGF0b3JzLmN1cnJlbmN5ID0gZnVuY3Rpb24obW9kZWxWYWx1ZSkge1xuICAgICAgcmV0dXJuIHV0aWwuaXNWYWxpZChtb2RlbFZhbHVlKTtcbiAgICB9O1xuXG4gIH07XG4gIHJldHVybiB7XG4gICAgJ3Jlc3RyaWN0JzogJ0EnLFxuICAgICdyZXF1aXJlJzogJ25nTW9kZWwnLFxuICAgICdsaW5rJzogbGlua1xuICB9O1xufV0pO1xuIl19
