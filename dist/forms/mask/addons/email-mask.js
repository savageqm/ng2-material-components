"use strict";
var email_pipe_1 = require('./email-pipe');
var asterisk = '*';
var dot = '.';
var emptyString = '';
var atSymbol = '@';
var caretTrap = '[]';
var space = ' ';
var g = 'g';
var anyNonWhitespaceRegExp = /[^\s]/;
var anyNonDotOrWhitespaceRegExp = /[^.\s]/;
var allWhitespaceRegExp = /\s/g;
function emailMask(rawValue, config) {
    rawValue = rawValue.replace(allWhitespaceRegExp, emptyString);
    var placeholderChar = config.placeholderChar, currentCaretPosition = config.currentCaretPosition;
    var indexOfFirstAtSymbol = rawValue.indexOf(atSymbol);
    var indexOfLastDot = rawValue.lastIndexOf(dot);
    var indexOfTopLevelDomainDot = (indexOfLastDot < indexOfFirstAtSymbol) ? -1 : indexOfLastDot;
    var localPartToDomainConnector = getConnector(rawValue, indexOfFirstAtSymbol + 1, atSymbol);
    var domainNameToTopLevelDomainConnector = getConnector(rawValue, indexOfTopLevelDomainDot - 1, dot);
    var localPart = getLocalPart(rawValue, indexOfFirstAtSymbol);
    var domainName = getDomainName(rawValue, indexOfFirstAtSymbol, indexOfTopLevelDomainDot, placeholderChar);
    var topLevelDomain = getTopLevelDomain(rawValue, indexOfTopLevelDomainDot, placeholderChar, currentCaretPosition);
    localPart = convertToMask(localPart);
    domainName = convertToMask(domainName);
    topLevelDomain = convertToMask(topLevelDomain, true);
    var mask = localPart
        .concat(localPartToDomainConnector)
        .concat(domainName)
        .concat(domainNameToTopLevelDomainConnector)
        .concat(topLevelDomain);
    return mask;
}
function getConnector(rawValue, indexOfConnection, connectionSymbol) {
    var connector = [];
    if (rawValue[indexOfConnection] === connectionSymbol) {
        connector.push(connectionSymbol);
    }
    else {
        connector.push(caretTrap, connectionSymbol);
    }
    connector.push(caretTrap);
    return connector;
}
function getLocalPart(rawValue, indexOfFirstAtSymbol) {
    if (indexOfFirstAtSymbol === -1) {
        return rawValue;
    }
    else {
        return rawValue.slice(0, indexOfFirstAtSymbol);
    }
}
function getDomainName(rawValue, indexOfFirstAtSymbol, indexOfTopLevelDomainDot, placeholderChar) {
    var domainName = emptyString;
    if (indexOfFirstAtSymbol !== -1) {
        if (indexOfTopLevelDomainDot === -1) {
            domainName = rawValue.slice(indexOfFirstAtSymbol + 1, rawValue.length);
        }
        else {
            domainName = rawValue.slice(indexOfFirstAtSymbol + 1, indexOfTopLevelDomainDot);
        }
    }
    domainName = domainName.replace(new RegExp("[\\s" + placeholderChar + "]", g), emptyString);
    if (domainName === atSymbol) {
        return asterisk;
    }
    else if (domainName.length < 1) {
        return space;
    }
    else if (domainName[domainName.length - 1] === dot) {
        return domainName.slice(0, domainName.length - 1);
    }
    else {
        return domainName;
    }
}
function getTopLevelDomain(rawValue, indexOfTopLevelDomainDot, placeholderChar, currentCaretPosition) {
    var topLevelDomain = emptyString;
    if (indexOfTopLevelDomainDot !== -1) {
        topLevelDomain = rawValue.slice(indexOfTopLevelDomainDot + 1, rawValue.length);
    }
    topLevelDomain = topLevelDomain.replace(new RegExp("[\\s" + placeholderChar + ".]", g), emptyString);
    if (topLevelDomain.length === 0) {
        return (rawValue[indexOfTopLevelDomainDot - 1] === dot && currentCaretPosition !== rawValue.length) ?
            asterisk :
            emptyString;
    }
    else {
        return topLevelDomain;
    }
}
function convertToMask(str, noDots) {
    return str
        .split(emptyString)
        .map(function (char) { return char === space ? char : (noDots) ? anyNonDotOrWhitespaceRegExp : anyNonWhitespaceRegExp; });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { mask: emailMask, pipe: email_pipe_1.default };
