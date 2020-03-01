import os
import sys
import json

from lxml import etree
import zipfile


def read_in():
    line = sys.stdin.readline()
    return json.loads(line)


def main():

    docId = read_in()

    ooXMLns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    docxZip = zipfile.ZipFile(
        './src/collections/docs/documents/' + docId + '.docx')
    commentsXML = docxZip.read('word/comments.xml')
    et = etree.XML(commentsXML)

    extraction = {'comments': [], 'inserts': [], 'lines': []}

    comments = et.xpath('//w:comment', namespaces=ooXMLns)
    for c in comments:
        authors = c.xpath('@w:author', namespaces=ooXMLns)
        date = c.xpath('@w:date', namespaces=ooXMLns)
        content = c.xpath('string(.)', namespaces=ooXMLns)
        extraction['comments'].append({
            'authors': authors,
            'date': date,
            'content': content
        })

    insertsXML = docxZip.read('word/document.xml')
    te = etree.XML(insertsXML)

    inserts = te.xpath('//w:p', namespaces=ooXMLns)
    x = 0
    y = 0
    for i in inserts:
        l = i.xpath('string(.)', namespaces=ooXMLns)
        if (l != ''):
            extraction['lines'].append(l)
        if (i.xpath('w:ins', namespaces=ooXMLns)):
            line = i.xpath('string(.)', namespaces=ooXMLns)
            extraction['inserts'].append({
                'line': line
            })
            ins = i.xpath('w:r|w:ins', namespaces=ooXMLns)
            inserted = []
            for ting in ins:
                author = ting.xpath('@w:author', namespaces=ooXMLns)
                date = ting.xpath('@w:date', namespaces=ooXMLns)
                content = ting.xpath('string(.)', namespaces=ooXMLns)
                inserted.append({
                    'author': author,
                    'date': date,
                    'content': content
                })
            extraction['inserts'][x]['inserted'] = inserted
            x += 1
        if (i.xpath('w:del', namespaces=ooXMLns)):
            line = i.xpath('string(.)', namespaces=ooXMLns)
            extraction['deletes'].append({
                'line': line
            })
            d = i.xpath('w:r|w:del', namespaces=ooXMLns)
            deleted = []
            for ting in d:
                author = ting.xpath('@w:author', namespaces=ooXMLns)
                date = ting.xpath('@w:date', namespaces=ooXMLns)
                content = ting.xpath('string(.)', namespaces=ooXMLns)
                deleted.append({
                    'author': author,
                    'date': date,
                    'content': content
                })
            extraction['deletes'][y]['deleted'] = deleted
            y += 1

    jsonObj = json.dumps(extraction)
    print(jsonObj)


if __name__ == "__main__":
    main()
