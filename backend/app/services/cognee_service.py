class CogneeService:
    def remember(self, data: str):
        return {"status": "success", "operation": "remember", "data": data}

    def recall(self, query: str):
        return {"status": "success", "operation": "recall", "query": query}

    def improve(self):
        return {"status": "success", "operation": "improve"}

    def forget(self, memory_id: str):
        return {"status": "success", "operation": "forget", "memory_id": memory_id}