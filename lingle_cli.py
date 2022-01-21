import random
import string
from collections import defaultdict
import copy


def guess(key, lst):
    remaining = set(string.ascii_lowercase)
    in_word = set()
    fillers = ""
    for i in range(len(key)):
        fillers += '_'

    d = dict.fromkeys(string.ascii_lowercase, 0)
    for letter in key:
        d[letter] += 1
    
    s = ""
    cnt = 1
    while(True):
        d_tmp = copy.deepcopy(d)
        print("\nCurrent Word: " + fillers)
        print("Remaining Letters: ")
        print(remaining)
        if len(in_word) >= 1:
            print("Additional letters in word: ")
            print(in_word)
        s = input("Guess #" + str(cnt) + ": ").lower()
        if s == 'q':
            print("The correct answer was: " + key)
            return
        elif len(s) != len(key):
            print("Invalid number of characters.")
            continue
        elif s not in lst:
            print("Not a valid word.")
            continue
        elif s == key:
            print(s + " is the correct word!")
            return
        
        res = ["" for i in range(len(key))]
        sdict = defaultdict(list)
        for index, letter in enumerate(s):
            if letter in remaining:
                remaining.remove(letter)
            sdict[letter].append(index)
        
        for i, l in enumerate(s):
            if res[i] != "":
                continue
            if d_tmp[l] == 0:
                for j in sdict[l]:
                    res[j] = l + " not in word."
            elif len(sdict[l]) == 1:
                if s[i] == key[i]:
                    fill_lst = list(fillers)
                    fill_lst[i] = s[i]
                    fillers = "".join(fill_lst)
                    res[i] = l + " correct."
                else:
                    in_word.add(l)
                    res[i] = l + " in word, wrong spot."
            else:
                lst2 = sdict[l]
                for j in lst2:
                    if l == key[j]:
                        d_tmp[l] -= 1
                        lst2.remove(j)
                        fill_lst = list(fillers)
                        fill_lst[j] = s[j]
                        fillers = "".join(fill_lst)
                        res[j] = l + " correct"
                for j in lst2:
                    if d_tmp[l] <= 0:
                        res[j] = l + " not in word."
                    else:
                        d_tmp[l] -= 1
                        in_word.add(l)
                        res[j] = l + " in word, wrong spot."
        for msg in res:
            print(msg)
        cnt += 1


def all_words(length):
    lst = set()
    lst_file = open("dictionaries/scrabble.txt")
    for word in lst_file:
        word = word[:-1].lower()
        if len(word) == length and word.isalpha():
            lst.add(word)
    return lst


if __name__ == '__main__':
    word_file = open("dictionaries/words.txt")
    word_set = set()

    word_length = int(input("Length of word: "))
    for word in word_file:
        word = word[:-1]
        if len(word) == word_length and word.islower():
            word_set.add(word)
    key = random.choice(list(word_set))
    lst = all_words(word_length)
    guess(key, lst)