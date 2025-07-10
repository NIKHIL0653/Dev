// Algorithm visualization logic will be added here. 

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const barChart = document.querySelector('.bar-chart');
    const linkedListCanvas = document.querySelector('.linked-list-canvas');
    const treeCanvas = document.querySelector('.tree-canvas');
    const codePanel = document.querySelector('.code-panel pre code');
    const visualizationTitle = document.querySelector('.visualization-header h2');
    const codeTitle = document.querySelector('.code-panel h2');
    const playButton = document.querySelector('.controls button:nth-child(2)');
    const resetButton = document.querySelector('.controls button:nth-child(1)');
    const speedSlider = document.querySelector('.speed-control input');
    const langButtons = document.querySelectorAll('.language-selector button');
    const algoItems = document.querySelectorAll('.algorithms-list li');
    const searchControls = document.querySelector('.search-controls');
    const searchInput = document.querySelector('.search-controls input');
    const searchButton = document.querySelector('.search-controls button');
    const llControls = document.querySelector('.ll-controls');
    const llValueInput = document.getElementById('ll-value-input');
    const llIndexInput = document.getElementById('ll-index-input');
    const llInsertBtn = document.getElementById('ll-insert-btn');
    const llDeleteBtn = document.getElementById('ll-delete-btn');
    const speedControl = document.querySelector('.speed-control');
    const kadaneInfo = document.querySelector('.kadane-info');
    const currentMaxSpan = document.getElementById('current-max');
    const globalMaxSpan = document.getElementById('global-max');

    // --- Data Structures ---
    function createBinaryTree() {
        return {
            val: 10, id: 'n10',
            left: { val: 5, id: 'n5', left: { val: 3, id: 'n3' }, right: { val: 7, id: 'n7' } },
            right: { val: 15, id: 'n15', left: { val: 12, id: 'n12' }, right: { val: 18, id: 'n18' } }
        };
    }

    function createCyclicLinkedList() {
        let node1 = { val: 1, next: null }, node2 = { val: 2, next: null }, node3 = { val: 3, next: null }, node4 = { val: 4, next: null }, node5 = { val: 5, next: null };
        node1.next = node2;
        node2.next = node3;
        node3.next = node4;
        node4.next = node5;
        node5.next = node3; // Cycle
        return node1;
    }

    // --- State ---
    let numbers = [64, 34, 25, 12, 22, 11, 90];
    let kadaneNumbers = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    let linkedList = { head: { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: null } } } } };
    let linkedListWithCycle = createCyclicLinkedList();
    let tree = createBinaryTree();
    let currentAlgorithm = 'Bubble Sort';
    let isAnimating = false;
    let originalNumbers = [...numbers];

    // --- ALGORITHMS DATA (with complete code) ---
    const algorithms = {
        'Bubble Sort': {
            category: 'Sorting Algorithms',
            visualization: bubbleSort,
            code: {
                python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
                cpp: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
                java: `void bubbleSort(int arr[]) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`
            }
        },
        'Selection Sort': {
            category: 'Sorting Algorithms',
            visualization: selectionSort,
            code: {
                python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
                cpp: `void selectionSort(int arr[], int n) {
    int i, j, min_idx;
    for (i = 0; i < n - 1; i++) {
        min_idx = i;
        for (j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        swap(arr[min_idx], arr[i]);
    }
}`,
                java: `void selectionSort(int arr[]) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`
            }
        },
        'Insertion Sort': {
            category: 'Sorting Algorithms',
            visualization: insertionSort,
            code: {
                python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i-1
        while j >= 0 and key < arr[j] :
                arr[j + 1] = arr[j]
                j -= 1
        arr[j + 1] = key
    return arr`,
                cpp: `void insertionSort(int arr[], int n) {
    int i, key, j;
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
                java: `void insertionSort(int arr[]) {
    int n = arr.length;
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`
            }
        },
        'Heap Sort': {
            category: 'Sorting Algorithms',
            visualization: heapSort,
            code: {
                python: `def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if l < n and arr[i] < arr[l]:
        largest = l
    if r < n and arr[largest] < arr[r]:
        largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n-1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
    return arr`,
                cpp: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest])
        largest = l;
    if (r < n && arr[r] > arr[largest])
        largest = r;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
                java: `public void heapSort(int arr[]) {
    int n = arr.length;
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}

void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest])
        largest = l;
    if (r < n && arr[r] > arr[largest])
        largest = r;
    if (largest != i) {
        int swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        heapify(arr, n, largest);
    }
}`
            }
        },
        'Merge Sort': {
            category: 'Sorting Algorithms',
            visualization: mergeSort,
            code: {
                python: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr)//2
        L = arr[:mid]
        R = arr[mid:]
        merge_sort(L)
        merge_sort(R)
        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
    return arr`,
                cpp: `void merge(int arr[], int l, int m, int r) {
    int i, j, k;
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];
    for (i = 0; i < n1; i++) L[i] = arr[l + i];
    for (j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    i = 0; j = 0; k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1) { arr[k] = L[i]; i++; k++; }
    while (j < n2) { arr[k] = R[j]; j++; k++; }
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
                java: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[] = new int[n1];
    int R[] = new int[n2];
    for (int i = 0; i < n1; ++i) L[i] = arr[l + i];
    for (int j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];
    int i = 0, j = 0;
    int k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1) { arr[k] = L[i]; i++; k++; }
    while (j < n2) { arr[k] = R[j]; j++; k++; }
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`
            }
        },
        'Quick Sort': {
            category: 'Sorting Algorithms',
            visualization: quickSort,
            code: {
                python: `def partition(arr, low, high):
    i = (low-1)
    pivot = arr[high]
    for j in range(low, high):
        if arr[j] <= pivot:
            i = i+1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return (i+1)

def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi-1)
        quick_sort(arr, pi + 1, high)`,
                cpp: `int partition (int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
                java: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
            }
        },
        'Kadane\\\'s Algorithm': {
            category: 'Dynamic Programming',
            visualization: kadanesAlgorithm,
            code: {
                python: `def max_subarray_sum(arr):
    max_so_far = arr[0]
    current_max = arr[0]
    for i in range(1, len(arr)):
        current_max = max(arr[i], current_max + arr[i])
        max_so_far = max(max_so_far, current_max)
    return max_so_far`,
                cpp: `int maxSubArraySum(int a[], int size) {
    int max_so_far = a[0];
    int curr_max = a[0];
    for (int i = 1; i < size; i++) {
        curr_max = max(a[i], curr_max + a[i]);
        max_so_far = max(max_so_far, curr_max);
    }
    return max_so_far;
}`,
                java: `int maxSubArraySum(int a[]) {
    int size = a.length;
    int max_so_far = a[0];
    int current_max = a[0];
    for (int i = 1; i < size; i++) {
        current_max = Math.max(a[i], current_max + a[i]);
        max_so_far = Math.max(max_so_far, current_max);
    }
    return max_so_far;
}`
            }
        },
        'Linear Search': {
            category: 'Search Algorithms',
            visualization: linearSearch,
            code: {
                python: `def linear_search(arr, x):
    for i in range(len(arr)):
        if arr[i] == x:
            return i
    return -1`,
                cpp: `int linearSearch(int arr[], int n, int x) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == x)
            return i;
    }
    return -1;
}`,
                java: `int linearSearch(int arr[], int x) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        if (arr[i] == x)
            return i;
    }
    return -1;
}`
            }
        },
        'Binary Search': {
            category: 'Search Algorithms',
            visualization: binarySearch,
            code: {
                python: `def binary_search(arr, low, high, x):
    if high >= low:
        mid = (high + low) // 2
        if arr[mid] == x:
            return mid
        elif arr[mid] > x:
            return binary_search(arr, low, mid - 1, x)
        else:
            return binary_search(arr, mid + 1, high, x)
    else:
        return -1`,
                cpp: `int binarySearch(int arr[], int l, int r, int x) {
    if (r >= l) {
        int mid = l + (r - l) / 2;
        if (arr[mid] == x)
            return mid;
        if (arr[mid] > x)
            return binarySearch(arr, l, mid - 1, x);
        return binarySearch(arr, mid + 1, r, x);
    }
    return -1;
}`,
                java: `int binarySearch(int arr[], int l, int r, int x) {
    if (r >= l) {
        int mid = l + (r - l) / 2;
        if (arr[mid] == x)
            return mid;
        if (arr[mid] > x)
            return binarySearch(arr, l, mid - 1, x);
        return binarySearch(arr, mid + 1, r, x);
    }
    return -1;
}`
            }
        },
        'Jump Search': {
            category: 'Search Algorithms',
            visualization: jumpSearch,
            code: {
                python: `import math

def jump_search(arr, x):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0
    while arr[min(step, n)-1] < x:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            return -1
    while arr[prev] < x:
        prev += 1
        if prev == min(step, n):
            return -1
    if arr[prev] == x:
        return prev
    return -1`,
                cpp: `int jumpSearch(int arr[], int x, int n) {
    int step = sqrt(n);
    int prev = 0;
    while (arr[min(step, n) - 1] < x) {
        prev = step;
        step += sqrt(n);
        if (prev >= n)
            return -1;
    }
    while (arr[prev] < x) {
        prev++;
        if (prev == min(step, n))
            return -1;
    }
    if (arr[prev] == x)
        return prev;
    return -1;
}`,
                java: `public static int jumpSearch(int[] arr, int x) {
    int n = arr.length;
    int step = (int)Math.floor(Math.sqrt(n));
    int prev = 0;
    while (arr[Math.min(step, n) - 1] < x) {
        prev = step;
        step += (int)Math.floor(Math.sqrt(n));
        if (prev >= n)
            return -1;
    }
    while (arr[prev] < x) {
        prev++;
        if (prev == Math.min(step, n))
            return -1;
    }
    if (arr[prev] == x)
        return prev;
    return -1;
}`
            }
        },
        'Sliding Window': {
            category: 'Array/String',
            visualization: slidingWindow,
            code: {
                python: `def max_sum_subarray(arr, k):
    max_sum = 0
    window_sum = 0
    start = 0
    for end in range(len(arr)):
        window_sum += arr[end]
        if (end - start + 1) == k:
            max_sum = max(max_sum, window_sum)
            window_sum -= arr[start]
            start += 1
    return max_sum`,
                cpp: `int maxSum(int arr[], int n, int k) {
    if (n < k) {
        return -1;
    }
    int max_sum = 0;
    for (int i = 0; i < k; i++)
        max_sum += arr[i];
    int window_sum = max_sum;
    for (int i = k; i < n; i++) {
        window_sum += arr[i] - arr[i - k];
        max_sum = max(max_sum, window_sum);
    }
    return max_sum;
}`,
                java: `int maxSum(int arr[], int k) {
    int n = arr.length;
    if (n < k) {
        return -1;
    }
    int max_sum = 0;
    for (int i = 0; i < k; i++)
        max_sum += arr[i];
    int window_sum = max_sum;
    for (int i = k; i < n; i++) {
        window_sum += arr[i] - arr[i - k];
        max_sum = Math.max(max_sum, window_sum);
    }
    return max_sum;
}`
            }
        },
        'Two Pointer Technique': {
            category: 'Array/String',
            visualization: twoPointer,
            code: {
                python: `def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return [-1, -1]`,
                cpp: `pair<int, int> twoSum(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) {
            return make_pair(left, right);
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return make_pair(-1, -1);
}`,
                java: `int[] twoSum(int[] numbers, int target) {
    int left = 0, right = numbers.length - 1;
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) {
            return new int[] { left + 1, right + 1 };
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return new int[] { -1, -1 };
}`
            }
        },
        'Linked List Reversal': {
            category: 'Linked List',
            visualization: reverseLinkedList,
            code: {
                python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(head):
    prev = None
    curr = head
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    return prev`,
                cpp: `struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode* prev = NULL;
    ListNode* curr = head;
    while (curr != NULL) {
        ListNode* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
                java: `class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;
    while (curr != null) {
        ListNode nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`
            }
        },
        'Linked List Cycle Detection': {
            category: 'Linked List',
            visualization: detectCycle,
            code: {
                python: `def hasCycle(head):
    slow = head
    fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
                cpp: `bool hasCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            return true;
        }
    }
    return false;
}`,
                java: `public boolean hasCycle(ListNode head) {
    if (head == null) {
        return false;
    }
    ListNode slow = head;
    ListNode fast = head.next;
    while (slow != fast) {
        if (fast == null || fast.next == null) {
            return false;
        }
        slow = slow.next;
        fast = fast.next.next;
    }
    return true;
}`
            }
        },
        'Linked List Insertion': {
            category: 'Linked List',
            visualization: insertNode,
            code: {
                python: `def insert_node(head, value, index):
    new_node = ListNode(value)
    if index == 0:
        new_node.next = head
        return new_node
    
    current = head
    for _ in range(index - 1):
        if current is None:
            return head # Index out of bounds
        current = current.next

    if current:
        new_node.next = current.next
        current.next = new_node
    return head`,
                cpp: `ListNode* insertNode(ListNode* head, int value, int index) {
    ListNode* newNode = new ListNode(value);
    if (index == 0) {
        newNode->next = head;
        return newNode;
    }
    ListNode* current = head;
    for (int i = 0; i < index - 1 && current != nullptr; ++i) {
        current = current->next;
    }
    if (current != nullptr) {
        newNode->next = current->next;
        current->next = newNode;
    }
    return head;
}`,
                java: `public ListNode insertNode(ListNode head, int value, int index) {
    ListNode newNode = new ListNode(value);
    if (index == 0) {
        newNode.next = head;
        return newNode;
    }
    ListNode current = head;
    for (int i = 0; i < index - 1 && current != null; i++) {
        current = current.next;
    }
    if (current != null) {
        newNode.next = current.next;
        current.next = newNode;
    }
    return head;
}`
            }
        },
        'Linked List Deletion': {
            category: 'Linked List',
            visualization: deleteNode,
            code: {
                python: `def delete_node(head, index):
    if not head:
        return None
    if index == 0:
        return head.next
    
    current = head
    for _ in range(index - 1):
        if not current.next:
            return head # Index out of bounds
        current = current.next

    if current.next:
        current.next = current.next.next
    return head`,
                cpp: `ListNode* deleteNode(ListNode* head, int index) {
    if (head == nullptr) return nullptr;
    if (index == 0) {
        ListNode* temp = head;
        head = head->next;
        delete temp;
        return head;
    }
    ListNode* current = head;
    for (int i = 0; i < index - 1 && current->next != nullptr; ++i) {
        current = current->next;
    }
    if (current->next != nullptr) {
        ListNode* temp = current->next;
        current->next = current->next->next;
        delete temp;
    }
    return head;
}`,
                java: `public ListNode deleteNode(ListNode head, int index) {
    if (head == null) return null;
    if (index == 0) {
        return head.next;
    }
    ListNode current = head;
    for (int i = 0; i < index - 1; i++) {
        if (current.next == null) return head; // Index out of bounds
        current = current.next;
    }
    if (current.next != null) {
        current.next = current.next.next;
    }
    return head;
}`
            }
        },
        'BFS Traversal': {
            category: 'Tree Algorithms',
            visualization: bfsTraversal,
            code: {
                python: `from collections import deque

def bfs(root):
    if not root:
        return []
    
    visited = []
    queue = deque([root])
    
    while queue:
        node = queue.popleft()
        visited.append(node.val)
        
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
            
    return visited`,
                cpp: `#include <queue>
vector<int> bfs(TreeNode* root) {
    if (!root) return {};
    vector<int> res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* node = q.front();
        q.pop();
        res.push_back(node->val);
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
    return res;
}`,
                java: `List<Integer> bfs(TreeNode root) {
    if (root == null) return new ArrayList<>();
    List<Integer> res = new ArrayList<>();
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    while (!q.isEmpty()) {
        TreeNode node = q.poll();
        res.add(node.val);
        if (node.left != null) q.add(node.left);
        if (node.right != null) q.add(node.right);
    }
    return res;
}`
            }
        },
        'DFS Traversal': {
            category: 'Tree Algorithms',
            visualization: dfsTraversal,
            code: {
                python: `def dfs(root):
    if not root:
        return []
    
    visited = []
    stack = [root]
    
    while stack:
        node = stack.pop()
        visited.append(node.val)
        
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
            
    return visited`,
                cpp: `#include <stack>
#include <algorithm>
vector<int> dfs(TreeNode* root) {
    if (!root) return {};
    vector<int> res;
    stack<TreeNode*> s;
    s.push(root);
    while (!s.empty()) {
        TreeNode* node = s.top();
        s.pop();
        res.push_back(node->val);
        if (node->right) s.push(node->right);
        if (node->left) s.push(node->left);
    }
    return res;
}`,
                java: `List<Integer> dfs(TreeNode root) {
    if (root == null) return new ArrayList<>();
    List<Integer> res = new ArrayList<>();
    Stack<TreeNode> stack = new Stack<>();
    stack.push(root);
    while (!stack.isEmpty()) {
        TreeNode node = stack.pop();
        res.add(node.val);
        if (node.right != null) stack.push(node.right);
        if (node.left != null) stack.push(node.left);
    }
    return res;
}`
            }
        },
    };

    // --- VISUALIZATION & UI FUNCTIONS ---
    function getSpeed() { return 110 - speedSlider.value; }

    function updateCodeDisplay(lang) {
        if (algorithms[currentAlgorithm] && algorithms[currentAlgorithm].code && algorithms[currentAlgorithm].code[lang]) {
            codePanel.textContent = algorithms[currentAlgorithm].code[lang];
            codeTitle.textContent = `${lang.charAt(0).toUpperCase() + lang.slice(1)} Implementation`;
        } else {
             codePanel.textContent = `Code for ${currentAlgorithm} in ${lang} is not available yet.`;
        }
    }

    function updateVisualizerDisplay(category) {
        barChart.style.display = 'none';
        linkedListCanvas.style.display = 'none';
        treeCanvas.style.display = 'none';
        kadaneInfo.style.display = 'none';
        playButton.style.display = 'inline-flex';
        searchControls.style.display = 'none';
        llControls.style.display = 'none';
        speedControl.style.display = 'inline-flex';

        if (category === 'Linked List') {
            linkedListCanvas.style.display = 'flex';
            const isInsertDelete = ['Linked List Insertion', 'Linked List Deletion'].includes(currentAlgorithm);
            if (isInsertDelete) {
                llControls.style.display = 'flex';
                playButton.style.display = 'none';
            }
        } else if (category === 'Tree Algorithms') {
            treeCanvas.style.display = 'block';
        } else if (category === 'Search Algorithms') {
            barChart.style.display = 'flex';
            searchControls.style.display = 'flex';
            playButton.style.display = 'none';
        } else {
            barChart.style.display = 'flex';
        }

        if (currentAlgorithm === 'Kadane\\\'s Algorithm' || currentAlgorithm === 'Sliding Window') {
            kadaneInfo.style.display = 'block';
        }
    }

    // --- ALGORITHM IMPLEMENTATIONS ---
    async function bubbleSort() {let arr = [...numbers];let n = arr.length;for (let i = 0; i < n - 1; i++) {for (let j = 0; j < n - i - 1; j++) {if (isAnimating === false) return;generateBars(arr, { [j]: '#ffc107', [j + 1]: '#ffc107' });await new Promise(resolve => setTimeout(resolve, getSpeed()));if (arr[j] > arr[j + 1]) {generateBars(arr, { [j]: '#dc3545', [j + 1]: '#dc3545' });await new Promise(resolve => setTimeout(resolve, getSpeed()));[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];generateBars(arr, { [j]: '#28a745', [j + 1]: '#28a745' });await new Promise(resolve => setTimeout(resolve, getSpeed()));}}}numbers = arr;generateBars(numbers);}
    async function selectionSort() { let arr=[...numbers];let n=arr.length;for(let i=0;i<n-1;i++){let min_idx=i;for(let j=i+1;j<n;j++){if(isAnimating===false)return;generateBars(arr,{[i]:'#007bff',[j]:'#ffc107',[min_idx]:'#fd7e14'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));if(arr[j]<arr[min_idx]){min_idx=j;}}generateBars(arr,{[i]:'#dc3545',[min_idx]:'#dc3545'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));[arr[i],arr[min_idx]]=[arr[min_idx],arr[i]];generateBars(arr,{[i]:'#28a745',[min_idx]:'#28a745'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));}numbers=arr;generateBars(numbers);}
    async function insertionSort() { let arr=[...numbers];let n=arr.length;for(let i=1;i<n;i++){let key=arr[i];let j=i-1;generateBars(arr,{[i]:'#fd7e14'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));while(j>=0&&arr[j]>key){if(isAnimating===false)return;generateBars(arr,{[j]:'#ffc107',[j+1]:'#ffc107',[i]:'#fd7e14'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));arr[j+1]=arr[j];generateBars(arr,{[j]:'#dc3545',[j+1]:'#dc3545',[i]:'#fd7e14'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));j=j-1;}arr[j+1]=key;generateBars(arr,{[j+1]:'#28a745'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));}numbers=arr;generateBars(numbers);}
    async function heapSort() { let arr=[...numbers];let n=arr.length;for(let i=Math.floor(n/2)-1;i>=0;i--){await heapify(arr,n,i);}for(let i=n-1;i>0;i--){[arr[0],arr[i]]=[arr[i],arr[0]];generateBars(arr,{[0]:'#dc3545',[i]:'#dc3545'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));await heapify(arr,i,0);}numbers=arr;generateBars(numbers,{});}
    async function heapify(arr,n,i){let largest=i;let l=2*i+1;let r=2*i+2;generateBars(arr,{[i]:'#fd7e14'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));if(l<n){generateBars(arr,{[i]:'#fd7e14',[l]:'#ffc107'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));if(arr[l]>arr[largest]){largest=l;}}if(r<n){generateBars(arr,{[i]:'#fd7e14',[l]:'#6c757d',[r]:'#ffc107'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));if(arr[r]>arr[largest]){largest=r;}}if(largest!==i){[arr[i],arr[largest]]=[arr[largest],arr[i]];generateBars(arr,{[i]:'#dc3545',[largest]:'#dc3545'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));generateBars(arr,{});await heapify(arr,n,largest);}generateBars(arr,{});}
    async function mergeSort(){let arr=[...numbers];await mergeSortHelper(arr,0,arr.length-1);numbers=arr;generateBars(numbers);}
    async function mergeSortHelper(arr,l,r){if(l>=r){return;}if(isAnimating===false)return;const m=Math.floor(l+(r-l)/2);await mergeSortHelper(arr,l,m);await mergeSortHelper(arr,m+1,r);await merge(arr,l,m,r);}
    async function merge(arr,l,m,r){let n1=m-l+1;let n2=r-m;let L=new Array(n1);let R=new Array(n2);for(let i=0;i<n1;i++)L[i]=arr[l+i];for(let j=0;j<n2;j++)R[j]=arr[m+1+j];let i=0,j=0,k=l;while(i<n1&&j<n2){if(isAnimating===false)return;generateBars(arr,{[l+i]:'#ffc107',[m+1+j]:'#ffc107'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));if(L[i]<=R[j]){arr[k]=L[i];i++;}else{arr[k]=R[j];j++;}generateBars(arr,{[k]:'#28a745'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));k++;}while(i<n1){if(isAnimating===false)return;arr[k]=L[i];generateBars(arr,{[k]:'#28a745'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));i++;k++;}while(j<n2){if(isAnimating===false)return;arr[k]=R[j];generateBars(arr,{[k]:'#28a745'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));j++;k++;}}
    async function quickSort(){let arr=[...numbers];await quickSortHelper(arr,0,arr.length-1);numbers=arr;generateBars(numbers);}
    async function quickSortHelper(arr,low,high){if(low<high){if(isAnimating===false)return;let pi=await partition(arr,low,high);await quickSortHelper(arr,low,pi-1);await quickSortHelper(arr,pi+1,high);}}
    async function partition(arr,low,high){let pivot=arr[high];let i=low-1;generateBars(arr,{[high]:'#6f42c1'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));for(let j=low;j<high;j++){if(isAnimating===false)return i+1;generateBars(arr,{[j]:'#ffc107',[high]:'#6f42c1'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));if(arr[j]<pivot){i++;generateBars(arr,{[i]:'#dc3545',[j]:'#dc3545',[high]:'#6f42c1'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));[arr[i],arr[j]]=[arr[j],arr[i]];generateBars(arr,{[i]:'#28a745',[j]:'#28a745',[high]:'#6f42c1'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));}}generateBars(arr,{[i+1]:'#dc3545',[high]:'#dc3545'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));[arr[i+1],arr[high]]=[arr[high],arr[i+1]];generateBars(arr,{[i+1]:'#28a745'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));return i+1;}
    async function kadanesAlgorithm() {let arr=[...kadaneNumbers];let max_so_far=arr[0];let current_max=arr[0];for(let i=0;i<arr.length;i++){if(isAnimating===false)return;if(i>0){current_max=Math.max(arr[i],current_max+arr[i]);}max_so_far=Math.max(max_so_far,current_max);const colors={};for(let j=0;j<=i;j++){colors[j]='#ffc107';}generateBars(arr,colors);currentMaxSpan.textContent=current_max;globalMaxSpan.textContent=max_so_far;await new Promise(resolve=>setTimeout(resolve,getSpeed()*3));}generateBars(arr);}
    async function linearSearch() {const target=parseInt(searchInput.value,10);if(isNaN(target)){alert('Please enter a valid number to search.');return;}let arr=[...numbers];for(let i=0;i<arr.length;i++){if(isAnimating===false)return;generateBars(arr,{[i]:'#ffc107'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));if(arr[i]===target){generateBars(arr,{[i]:'#28a745'});return;}}generateBars(arr);alert('Element not found!');}
    async function binarySearch() {const target=parseInt(searchInput.value,10);if(isNaN(target)){alert('Please enter a valid number to search.');return;}let arr=[...numbers].sort((a,b)=>a-b);generateBars(arr);await new Promise(resolve=>setTimeout(resolve,getSpeed()*2));let low=0;let high=arr.length-1;while(low<=high){if(isAnimating===false)return;let mid=Math.floor((low+high)/2);generateBars(arr,{[low]:'#007bff',[high]:'#007bff',[mid]:'#ffc107'});await new Promise(resolve=>setTimeout(resolve,getSpeed()*2));if(arr[mid]===target){generateBars(arr,{[mid]:'#28a745'});return;}else if(arr[mid]<target){low=mid+1;}else{high=mid-1;}}generateBars(arr);alert('Element not found!');}
    async function jumpSearch() {let arr=[...numbers].sort((a,b)=>a-b);generateBars(arr);const target=parseInt(searchInput.value,10);if(isNaN(target)){alert('Please enter a valid number.');return;}let n=arr.length;let step=Math.floor(Math.sqrt(n));let prev=0;while(arr[Math.min(step,n)-1]<target){generateBars(arr,{[prev]:'#007bff',[Math.min(step,n)-1]:'#fd7e14'});await new Promise(resolve=>setTimeout(resolve,getSpeed()*2));prev=step;step+=Math.floor(Math.sqrt(n));if(prev>=n){alert('Element not found!');return;}}while(arr[prev]<target){generateBars(arr,{[prev]:'#ffc107'});await new Promise(resolve=>setTimeout(resolve,getSpeed()));prev++;if(prev===Math.min(step,n)){alert('Element not found!');return;}}if(arr[prev]===target){generateBars(arr,{[prev]:'#28a745'});}else{alert('Element not found!');}}
    async function slidingWindow(){const k=3;let arr=[...originalNumbers];let max_sum=0;let window_sum=0;let start=0;for(let end=0;end<arr.length;end++){if(isAnimating===false)return;window_sum+=arr[end];const colors={};for(let i=start;i<=end;i++)colors[i]='#007bff';generateBars(arr,colors);await new Promise(resolve=>setTimeout(resolve,getSpeed()*2));if(end-start+1===k){max_sum=Math.max(max_sum,window_sum);currentMaxSpan.textContent=`Window Sum: ${window_sum}`;globalMaxSpan.textContent=`Max Sum: ${max_sum}`;window_sum-=arr[start];start++;}}generateBars(arr);}
    async function twoPointer(){const target=100;let arr=[...originalNumbers].sort((a,b)=>a-b);generateBars(arr);await new Promise(resolve=>setTimeout(resolve,getSpeed()*2));let left=0;let right=arr.length-1;while(left<right){if(isAnimating===false)return;generateBars(arr,{[left]:'#ffc107',[right]:'#ffc107'});await new Promise(resolve=>setTimeout(resolve,getSpeed()*2));const sum=arr[left]+arr[right];if(sum===target){generateBars(arr,{[left]:'#28a745',[right]:'#28a745'});alert(`Found pair: ${arr[left]} and ${arr[right]}`);return;}else if(sum<target){left++;}else{right--;}}alert('No pair found.');generateBars(arr);}
    async function reverseLinkedList(){let prev=null;let current=linkedList.head;while(current){if(isAnimating===false)return;let next_temp=current.next;current.next=prev;drawLinkedList(current,{'prev':prev,'current':current});await new Promise(resolve=>setTimeout(resolve,getSpeed()*5));prev=current;current=next_temp;}linkedList.head=prev;drawLinkedList(linkedList.head);}
    async function detectCycle(){let slow=linkedListWithCycle;let fast=linkedListWithCycle;while(fast&&fast.next){if(isAnimating===false)return;slow=slow.next;fast=fast.next.next;drawLinkedList(linkedListWithCycle,{slow,fast});await new Promise(resolve=>setTimeout(resolve,getSpeed()*5));if(slow===fast){alert('Cycle Detected!');drawLinkedList(linkedListWithCycle,{slow:slow,fast:fast});return;}}alert('No Cycle Detected.');}
    async function insertNode(){const val=parseInt(llValueInput.value);let index=parseInt(llIndexInput.value);if(isNaN(val)){alert('Please enter a valid value.');return;}const newNode={val,next:null};if(!linkedList.head||isNaN(index)||index<=0){newNode.next=linkedList.head;linkedList.head=newNode;drawLinkedList(linkedList.head);return;}let current=linkedList.head;let i=0;while(current.next&&i<index-1){current=current.next;i++;}newNode.next=current.next;current.next=newNode;drawLinkedList(linkedList.head);}
    async function deleteNode(){
        const index=parseInt(llValueInput.value);
        if(isNaN(index) || index < 0){alert('Please enter a valid index to delete.');return;}
        if(!linkedList.head){return;}
        if(index === 0){
            linkedList.head = linkedList.head.next;
            drawLinkedList(linkedList.head);
            return;
        }
        let current=linkedList.head;
        let i=0;
        while(current.next && i < index - 1){
            current=current.next;
            i++;
        }
        if(current.next){
            current.next=current.next.next;
        }
        drawLinkedList(linkedList.head);
    }
    async function bfsTraversal(){const queue=[tree];const visited=new Set();while(queue.length>0){if(isAnimating===false)return;const node=queue.shift();visited.add(node.id);drawTree(tree,visited);await new Promise(resolve=>setTimeout(resolve,getSpeed()*4));if(node.left)queue.push(node.left);if(node.right)queue.push(node.right);}}
    async function dfsTraversal(){const visited=new Set();async function dfs(node){if(!node||isAnimating===false)return;visited.add(node.id);drawTree(tree,visited);await new Promise(resolve=>setTimeout(resolve,getSpeed()*4));await dfs(node.left);await dfs(node.right);}await dfs(tree);}
    
    // --- DRAWING FUNCTIONS ---
    function generateBars(arr, colors = {}) {
        barChart.innerHTML = '';
        const maxVal = Math.max(...arr.map(Math.abs));
        arr.forEach((value, index) => {
            const bar = document.createElement('div');
            const height = maxVal > 0 ? Math.abs(value) / maxVal * 150 : 0;
            bar.style.height = `${height}px`;
            bar.style.width = '40px';
            bar.innerText = value;
            bar.style.backgroundColor = value >= 0 ? '#6c757d' : '#a43843';
            bar.style.color = 'white';
            bar.style.textAlign = 'center';
            bar.style.border = '1px solid #343a40';
            if (colors[index]) { bar.style.backgroundColor = colors[index]; }
            barChart.appendChild(bar);
        });
    }
    
    function drawLinkedList(head, pointers = {}) {
        linkedListCanvas.innerHTML = '';
        let current = head;
        const nodes = [];
        const nodeMap = new Map();
        while (current && !nodeMap.has(current)) {
            const nodeEl = document.createElement('div');
            nodeEl.className = 'll-node';
            nodeEl.innerText = current.val;
            nodeMap.set(current, { el: nodeEl, node: current });
            linkedListCanvas.appendChild(nodeEl);
            nodes.push({ el: nodeEl, node: current });
            current = current.next;
        }
        
        requestAnimationFrame(() => {
            const svgNS = "http://www.w3.org/2000/svg";
            const svg = document.createElementNS(svgNS, "svg");
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.style.position = 'absolute';
            svg.style.top = '0';
            svg.style.left = '0';
            svg.style.zIndex = '-1';
            const defs = document.createElementNS(svgNS, 'defs');
            const marker = document.createElementNS(svgNS, 'marker');
            marker.setAttribute('id', 'arrow');
            marker.setAttribute('viewBox', '0 0 10 10');
            marker.setAttribute('refX', '8');
            marker.setAttribute('refY', '5');
            marker.setAttribute('markerWidth', '6');
            marker.setAttribute('markerHeight', '6');
            marker.setAttribute('orient', 'auto-start-reverse');
            const path = document.createElementNS(svgNS, 'path');
            path.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
            path.setAttribute('fill', '#333');
            marker.appendChild(path);
            defs.appendChild(marker);
            svg.appendChild(defs);
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].node.next && nodeMap.has(nodes[i].node.next)) {
                    const startNode = nodes[i].el;
                    const endNode = nodeMap.get(nodes[i].node.next).el;
                    const startRect = startNode.getBoundingClientRect();
                    const endRect = endNode.getBoundingClientRect();
                    const canvasRect = linkedListCanvas.getBoundingClientRect();
                    const line = document.createElementNS(svgNS, 'line');
                    line.setAttribute('x1', String(startRect.left - canvasRect.left + startRect.width / 2));
                    line.setAttribute('y1', String(startRect.top - canvasRect.top + startRect.height / 2));
                    line.setAttribute('x2', String(endRect.left - canvasRect.left + endRect.width / 2));
                    line.setAttribute('y2', String(endRect.top - canvasRect.top + endRect.height / 2));
                    line.setAttribute('stroke', '#333');
                    line.setAttribute('stroke-width', '2');
                    line.setAttribute('marker-end', 'url(#arrow)');
                    svg.appendChild(line);
                }
            }
            linkedListCanvas.appendChild(svg);
        });

        for(let key in pointers) {
            if(pointers[key]) {
                const nodeInfo = nodeMap.get(pointers[key]);
                if (nodeInfo) {
                    nodeInfo.el.style.backgroundColor = key === 'slow' ? '#ffc107' : '#dc3545';
                }
            }
        }
    }
    
    function drawTree(root, visitedNodes = new Set()) {
        treeCanvas.innerHTML = '';
        const positions = new Map();
        function calculatePositions(node, x, y, horizontalGap) {
            if (!node) return;
            positions.set(node.id, { x, y, node });
            calculatePositions(node.left, x - horizontalGap, y + 80, horizontalGap / 2);
            calculatePositions(node.right, x + horizontalGap, y + 80, horizontalGap / 2);
        }
        calculatePositions(root, treeCanvas.offsetWidth / 2, 50, treeCanvas.offsetWidth / 4);
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.position = 'absolute';
        positions.forEach(posData => {
            if (posData.node.left) {
                const childPos = positions.get(posData.node.left.id);
                const line = document.createElementNS(svgNS, 'line');
                line.setAttribute('x1', posData.x);line.setAttribute('y1', posData.y);line.setAttribute('x2', childPos.x);line.setAttribute('y2', childPos.y);line.setAttribute('stroke', '#333');svg.appendChild(line);
            }
            if (posData.node.right) {
                const childPos = positions.get(posData.node.right.id);
                 const line = document.createElementNS(svgNS, 'line');
                line.setAttribute('x1', posData.x);line.setAttribute('y1', posData.y);line.setAttribute('x2', childPos.x);line.setAttribute('y2', childPos.y);line.setAttribute('stroke', '#333');svg.appendChild(line);
            }
        });
        treeCanvas.appendChild(svg);
        positions.forEach(posData => {
            const nodeEl = document.createElement('div');
            nodeEl.className = 'tree-node';
            nodeEl.style.left = `${posData.x}px`;
            nodeEl.style.top = `${posData.y}px`;
            nodeEl.innerText = posData.node.val;
            if (visitedNodes.has(posData.node.id)) { nodeEl.classList.add('visited'); }
            treeCanvas.appendChild(nodeEl);
        });
    }

    // --- EVENT LISTENERS ---
    function runAnimation(vizFn) {
        if (isAnimating) return;
        isAnimating = true;
        playButton.disabled = true;
        searchButton.disabled = true;
        llInsertBtn.disabled = true;
        llDeleteBtn.disabled = true;
        vizFn().finally(() => {
            isAnimating = false;
            playButton.disabled = false;
            searchButton.disabled = false;
            llInsertBtn.disabled = false;
            llDeleteBtn.disabled = false;
        });
    }

    playButton.addEventListener('click', () => runAnimation(algorithms[currentAlgorithm].visualization));
    searchButton.addEventListener('click', () => runAnimation(algorithms[currentAlgorithm].visualization));
    llInsertBtn.addEventListener('click', insertNode);
    llDeleteBtn.addEventListener('click', deleteNode);

    resetButton.addEventListener('click', () => {
        isAnimating = false;
        const category = algorithms[currentAlgorithm].category;
        if (currentAlgorithm === 'Linked List Cycle Detection') {
            linkedListWithCycle = createCyclicLinkedList();
            drawLinkedList(linkedListWithCycle);
        } else if (category === 'Linked List') {
            linkedList = { head: { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: null } } } } };
            drawLinkedList(linkedList.head);
        } else if (category === 'Tree Algorithms') {
            tree = createBinaryTree();
            drawTree(tree);
        } else {
            numbers = (currentAlgorithm === 'Kadane\\\'s Algorithm') ? [...kadaneNumbers] : [...originalNumbers];
            generateBars(numbers);
        }
        if (currentAlgorithm === 'Kadane\\\'s Algorithm' || currentAlgorithm === 'Sliding Window') {
             currentMaxSpan.textContent = '0';
             globalMaxSpan.textContent = '0';
        }
    });

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateCodeDisplay(button.innerText.toLowerCase());
        });
    });

    algoItems.forEach(item => {
        item.addEventListener('click', () => {
            if (isAnimating) return;
            algoItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            currentAlgorithm = item.innerText;
            visualizationTitle.innerText = `${currentAlgorithm} Visualization`;
            updateCodeDisplay(document.querySelector('.language-selector button.active').innerText.toLowerCase());
            resetButton.click();
            updateVisualizerDisplay(algorithms[currentAlgorithm].category);
        });
    });

    // --- INITIAL SETUP ---
    resetButton.click();
    updateCodeDisplay('python');
    updateVisualizerDisplay('Sorting Algorithms');
}); 